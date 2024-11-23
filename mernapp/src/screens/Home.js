import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer'
import Card from '../components/Card';
export default function Home() {
    const [search, setSearch] = useState('');
    const [foodCat, setFoodCat] = useState([]);
    const [foodItem, setFoodItem] = useState([]);

    const loadData = async () => {
        try {
            let response = await fetch("http://localhost:5000/api/foodData", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            setFoodItem(data[0]);
            setFoodCat(data[1]);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div>
            <Navbar />
            <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" data-bs-interval="3000">
                <div className="carousel-inner" id="carousel">
                    <div className="carousel-caption d-none d-md-block" style={{ zIndex: "10" }}>
                        <div className="d-flex justify-content-center">
                            <input
                                className="form-control me-2 bg-dark text-light"
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="carousel-item active">
                        <img src="https://cdn.pixabay.com/photo/2023/09/25/22/08/ai-generated-8276129_1280.jpg" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://cdn.pixabay.com/photo/2016/06/06/18/29/meat-skewer-1440105_1280.jpg" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://cdn.pixabay.com/photo/2024/11/05/09/56/pizza-9175526_1280.jpg" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
                    </div>
                </div>

                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>

            <div className='container'>
                {
                    foodCat.length > 0
                        ? foodCat.map((data) => {
                            return (
                                <div className='row mb-3' key={data._id || data.CategoryName}>
                                    <div className='fs-3 m-3'>{data.CategoryName}</div>
                                    <hr />
                                    {foodItem
                                        .filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLowerCase())))
                                        .map(filterItems => {
                                            return (
                                                <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                                                    <Card
                                                        foodItem={filterItems}
                                                        options={filterItems.options[0]}
                                                    />
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            );
                        })
                        : ""
                }
            </div>

            <Footer />
        </div>
    );
}
