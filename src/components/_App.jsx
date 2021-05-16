import React, {useState} from "react";
//import {Button, Dropdown, DropdownButton} from "react-bootstrap";

import Footer from "./Footer";
import Header from "./Header";
import Offer from "./Offer";
import NoOffers from "./NoOffers";
import AddOffer from "./AddOffer";

import testContent from "../testContent";

function App(){
    

    const [categories, setCategories] = useState([])
    const [location, setLocation] = useState([])
    const [offers, setOffers] = useState([])

    const [selectedCategory, setSelectedCategory] =useState("")
    const [selectedLocation, setSelectedLocation] =useState("")
    const [addOfferState, setAddOfferState] = useState(false)
    
    
    


    function addFilterOptions(){
        const tempCat = new Set();
        const tempLoc = new Set();

        if(categories.length === 0){
            testContent.forEach(element => {
                tempCat.add(element.category)    
            });

            setCategories(()=>{
                return [...tempCat, "Alla"]
            })
        }

        if(location.length === 0){
            testContent.forEach(element => {
                tempLoc.add(element.location)    
            });

            setLocation(()=>{
                return [...tempLoc, "Alla"]
            })
        }

    }

    // //categories-listan används för att ta fram alternativ för filter

    

    // function addCategory(){
        
    //     const testCat = new Set();

    //     if(categories.length === 0){
    //         testContent.forEach(element => {
    //             testCat.add(element.category)    
    //         });

    //         setCategories(()=>{
    //             return [...testCat, "Alla"]
    //         })
    //     }

        

    // }

    // //location-listan används för att ta fram alternativ för filter

    // function addLocation(){
        
    //     const testLoc = new Set();

    //     if(location.length === 0){
    //         testContent.forEach(element => {
    //             testLoc.add(element.location)    
    //         });

    //         setLocation(()=>{
    //             return [...testLoc, "Alla"]
    //         })
    //     }

    // }

    
    function filterCategories(chosenCategory){
        
        chosenCategory !== "Alla" ? 
        setSelectedCategory(chosenCategory) : 
        setSelectedCategory("");
    }

    function filterLocations(chosenLocation){
        
        chosenLocation !== "Alla" ? 
        setSelectedLocation(chosenLocation) : 
        setSelectedLocation("");
    }

    //För att nollställa filtren
    function resetFilters(){
        setSelectedCategory("");
        setSelectedLocation("");
    }

    function addOffer(){
        setAddOfferState(prevState =>{ return !prevState})
        
        
    }

    function submitOffer(submittedOffer){
        addOffer();
        console.log("subm Offer: ",submittedOffer);
        setOffers(prevState =>{ return [...prevState, submittedOffer] })
        
    }

    function createOffer(content){
        return (
            <Offer 
            key = {content.key}
            title = {content.title} 
            offer = {content.offer} 
            store = {content.store}
            location = {content.location} 
            description = {content.description}
            
            />
        )
    }

    function filterTest(){

        if(selectedCategory.length === 0 && selectedLocation.length === 0)
        {
            return testContent.map(item =>{
                return item
            });
        }
        if(selectedCategory.length === 0 && selectedLocation.length !== 0)
        {
            return testContent.filter(item =>{
                return item.location === selectedLocation
                
            });
        }
        if(selectedCategory.length !== 0 && selectedLocation.length === 0)
        {
            return testContent.filter(item =>{
                return item.category === selectedCategory
                
            });
        }
        if (selectedCategory.length !== 0 && selectedLocation.length !== 0)
        {
            return testContent.filter(item =>{
                return item.location === selectedLocation && item.category === selectedCategory
            });
        };

        
    }



    return (
        <div>
        
        {/* {addCategory()}
        {addLocation()} */}
        
        {addFilterOptions()}

        <div className="wrapper">
            <Header 
                categories = {categories} 
                location = {location}
                pageState = {addOfferState}
                locationClicked={filterLocations}
                categoryClicked={filterCategories}
                addClicked = {addOffer}

            />
            
                

            <div className="wrapper__content">

                {addOfferState ? 
                <AddOffer submitClicked = {submitOffer}/> :
                filterTest().length === 0 ? 
                <NoOffers resetClicked ={resetFilters} /> : 
                filterTest().map(createOffer)
                }
                    
                {/* {addOfferState && <AddOffer /> }
                
                {filterTest().length === 0 ? 
                <NoOffers resetClicked ={resetFilters} /> : 
                filterTest().map(createOffer)} */}

            </div>

            

            <Footer />
        </div>

    </div>
    )
  
}

export default App;