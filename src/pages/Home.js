import Jumbotron from '../components/cards/Jumbotron'
import BestSellers from '../components/home/BestSellers'
import NewArrivals from '../components/home/NewArrivals'


const Home = () => {
   
    return (
        <div>
            <div className="jumbotron text-danger h1 font-weight-bold text-center">
            <Jumbotron text={['New Arrivals', 'Best Sellers', 'Latest Products']} />
            </div>
            

        <h4 className="text-center p-3 mt-5 mb-5 jumbotron">New Arrivals</h4>
           
            <NewArrivals />
            <br />

            <h4 className="text-center p-3 mt-5 mb-5 jumbotron">Best Sellers</h4>
           
           <BestSellers />
           <br />
        </div>
    )
}

export default Home
