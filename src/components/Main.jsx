import React from "react";
import { fireDatabase } from "../firebase/init"
import {Spinner} from "react-bootstrap";

import { removePost } from "../scripts/delete"

import Offer from "./Offer"
import Header from "./Header";
import NoOffers from "./NoOffers";
import AddOffer from "./AddOffer";
import auth from "../firebase/auth"

class Main extends React.Component {
    
    constructor(props){
        super(props)
        this.deleteOffer = this.deleteOffer.bind(this);
        this.addOffer = this.addOffer.bind(this);
        this.submitNewOffer = this.submitNewOffer.bind(this);
        this.createOffer = this.createOffer.bind(this);
        this.filterCategories = this.filterCategories.bind(this);
        this.filterLocations = this.filterLocations.bind(this);
        this.filterTest = this.filterTest.bind(this);
        this.resetFilters = this.resetFilters.bind(this);
        this.getUserName = this.getUserName.bind(this);

        this.state={
            categories: [],
            location: [],
            offer: {},
            offers: [],
            selectedCategory: "",
            selectedLocation: "",
            addOfferState: false,
            
            loading: true,

            loggedIn: true,
            userID:"",
            userName: "Anonymous"
        }
    }

    async getOffers(){
        
        const tempCat = new Set();
        const tempLoc = new Set();
        const date = Date.now();
        let temp = []

        fireDatabase.collection("tips").orderBy("date", "desc").get()
        .then(snapshot =>{
            snapshot.forEach(doc => {
                
                let tip = doc.data()
                tip.key = doc.id
                
                if(tip.expires > date){
                    temp.push(tip)
                }else{
                    console.log(tip.key, " har gått ut");
                    removePost(tip.key)
                }
            })

            temp.forEach(element => {
                tempCat.add(element.category)
            });
            
            temp.forEach(element => {
                tempLoc.add(element.location)    
            });

            this.setState(()=>({offers: temp, loading: false}))
            this.setState(()=>({categories: ["Alla kategorier", ...tempCat]}))
            this.setState(()=>({location: ["Alla orter", ...tempLoc]}))

        }).catch(error =>{
            console.log("getOffers() -> ", error);
        })
    }

    // removeExpiredPosts(id){

    //     //
    //     // fireDatabase.collection("tips").doc(id).delete().then(()=>{
    //     //     console.log(id, " borttaget från databasen");
    //     // }).catch((err)=>{
    //     //     console.log(id, " gick inte att uppdatera i databasen", err);
    //     // })

    //     console.log(tip.key, " har gått ut");

    //     fireDatabase.collection("tips").doc(id).update({
    //         status: "expired"
    //     }).then(()=>{
    //         console.log(id, " uppdaterades i databasen");
    //     }).catch((err)=>{
    //         console.log(id, " gick inte att uppdatera i databasen", err);
    //     })
    // }

    componentDidMount(){
        //Om data redan finns bör inte dessa operationer upprepas. T ex då användare går mellan sidor
        this.getUserName(auth.getUid())
        this.getOffers();
    }

    getUserName(uid){

        // console.log("uid-in -> ", uid );

        const ref = fireDatabase.collection("users").where("user_id", "==", uid)

        ref.get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            // console.log("username -> ", doc.data().name);
            this.setState(()=>({userName: doc.data().name}))
        });
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        })

    }

    //För att skapa ett tips
    addOffer(){
        this.setState(()=>({addOfferState: !this.state.addOfferState}))
    }

    //Skriver nytt tips till databas
    submitNewOffer(newOffer){
        
        if(newOffer.title.length !== 0 && newOffer.offer.length !== 0){

            fireDatabase.collection("tips").add({
                //newOffer
                category: newOffer.category,
                title: newOffer.title,
                offer: newOffer.offer,
                store: newOffer.store,
                description: newOffer.description,
                location: newOffer.location,
                createdBy: newOffer.createdBy,
                date: newOffer.date,
                expires: newOffer.expires,
            }).then((docRef)=>{
                console.log("Document written with ID: ", docRef.id);
            }).catch(error =>{
                console.error("Error adding document: ", error);
            })

            this.getOffers();
        }
        this.setState(()=>({addOfferState: false, offer: {}}))
    }

    deleteOffer(id){
        
        //Använd removePost

        // removePost(id)

        fireDatabase.collection("tips").doc(id).delete()
        .then(()=>{
            console.log("dokumentet borttaget");
            this.getOffers();
        }).catch(error =>{
            console.log("Error removing document: ", error);
        })

    }

    filterCategories(chosenCategory){
        this.setState(()=>(
            chosenCategory !== "Alla kategorier" ?
            {selectedCategory: chosenCategory} : 
            {selectedCategory: ""}
        ))
    }
    
    filterLocations(chosenLocation){
        this.setState(()=>(
            chosenLocation !== "Alla orter" ?
            {selectedLocation: chosenLocation} : 
            {selectedLocation: ""}
        ))
    }
    
    // //För att nollställa filtren
    resetFilters(){
        this.setState(()=>({
            selectedCategory: "",
            selectedLocation: ""
        }))
    }

    filterTest(){

        const selCat = this.state.selectedCategory;
        const selLoc = this.state.selectedLocation;

        if(selCat.length === 0 && selLoc.length === 0)
        {
            return this.state.offers.map((item, index) =>{
                return (index = item.key, item)
            });
        }
        if(selCat.length === 0 && selLoc.length !== 0)
        {
            return this.state.offers.filter(item =>{
                return item.location === selLoc
                
            });
        }
        if(selCat.length !== 0 && selLoc.length === 0)
        {
            return this.state.offers.filter(item =>{
                return item.category === selCat;
                
            });
        }
        if (selCat.length !== 0 && selLoc.length !== 0)
        {
            return this.state.offers.filter(item =>{
                return item.location === selLoc && item.category === selCat
            });
        };
    }

    createOffer(content){
        return <Offer
            key = {content.key} //Kan det här funka?

            offerId = {content.key}
            title = {content.title} 
            offer = {content.offer} 
            store = {content.store}
            location = {content.location} 
            description = {content.description}

            date = {content.date}
            expires = {content.expires}

            createdBy = {content.createdBy}
            
            currentUser = {this.state.userName}
            regState = {this.state.loggedIn}

            editClicked ={this.editOffer}
            deleteClicked ={this.deleteOffer}
        />
    }

    render(){
        return(
            <div>
                <Header 
                    categories = {this.state.categories} 
                    location = {this.state.location}
                    pageState = {this.state.addOfferState}
                    regState = {this.state.loggedIn}
                    locationClicked={this.filterLocations}
                    categoryClicked={this.filterCategories}
                    addClicked = {this.addOffer}
                />
                
                <div className="wrapper__content">
                    
                    {this.state.loading && 
                        <div className="spinner">
                            <Spinner 
                            animation ="border" 
                            variant ="primary"
                            className="spinner" 
                            />
                        </div>
                    }

                    {this.state.addOfferState && 
                        <AddOffer 
                            submitClicked = {this.submitNewOffer}
                            user = {this.state.userName}
                            // offerToEdit = {this.state.offer[0]}
                        />
                    }

                    {!this.state.addOfferState &&
                        (this.filterTest().length === 0 & !this.state.loading ? 
                            <NoOffers 
                                resetClicked = {this.resetFilters} 
                            /> : 
                        this.filterTest().map(this.createOffer))
                    }

                </div>
            </div>
        );
    }
}

export default Main;