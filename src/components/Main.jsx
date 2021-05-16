import React from "react";
//import firebase from "firebase"
import db from "../firebase/init"
import {Spinner} from "react-bootstrap";

import Offer from "./Offer"
import Header from "./Header";
import NoOffers from "./NoOffers";
import AddOffer from "./AddOffer";

class Main extends React.Component {
    
    constructor(props){
        super(props)
        this.deleteOffer = this.deleteOffer.bind(this);
        // this.editOffer = this.editOffer.bind(this);
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

        let temp = []

        db.collection("tips").get()
        .then(snapshot =>{
            snapshot.forEach(doc => {
                let tip = doc.data()
                tip.key = doc.id
                temp.push(tip)
            })

            temp.sort((a, b) => {
                let aDate = a.date;
                let bDate = b.date;
        
                if(aDate < bDate){
                    return 1;
                }
                if(aDate > bDate){
                    return -1;
                }
        
                return 0;
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

    componentDidMount(){

        //Använd uid för att hämta namn.
        //lagrar inloggads användarnamn i session storage
        this.setState(()=>({
            userID: JSON.parse(sessionStorage.getItem("loggedInUser"))
        }))

        this.getUserName(JSON.parse(sessionStorage.getItem("loggedInUser")))
        
        this.getOffers();
        
    }

    getUserName(uid){

        // console.log("uid-in -> ", uid );

        const ref = db.collection("users").where("user_id", "==", uid)

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

            // console.log(newOffer);

            db.collection("tips").add({
                //newOffer
                category: newOffer.category,
                title: newOffer.title,
                offer: newOffer.offer,
                store: newOffer.store,
                description: newOffer.description,
                location: newOffer.location,
                createdBy: newOffer.createdBy,
                date: newOffer.date
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
        
        db.collection("tips").doc(id).delete()
        .then(()=>{
            console.log("dokumentet borttaget");
        }).catch(error =>{
            console.log("Error removing document: ", error);
        })

        this.getOffers();
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

    createOffer(content, index){
        return <Offer 
            offerId = {content.key}
            title = {content.title} 
            offer = {content.offer} 
            store = {content.store}
            location = {content.location} 
            description = {content.description}
            date = {new Date(parseInt(content.date)).toLocaleDateString()}
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
                        this.filterTest().map(this.createOffer, this.filterTest.key))
                    }

                </div>
            </div>
        );
    }
}

export default Main;