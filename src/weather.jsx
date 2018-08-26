import React from 'react';

export default class Weather extends React.Component {
    state = {
        error: null,
        isLoaded: false,
        city: 'Gdańsk',
        temp: '',
        desc: '',
        errorVal: ''
    };

    handleInputChange = (e) =>{
        this.setState({
            city: e.target.value
        })
    };

    handleClick = (e) => {
        e.preventDefault();
        this.chooseCity();
    };


    chooseCity = () => {
        const API_KEY = '58efff396509f610293e0d55df56db5f';

        const cityName = this.state.city;
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&lang=pl&units=metric`)
            .then(res => res.json())
            .then(
                (result) => {
                    if (result.name === undefined){
                        this.setState({
                            errorVal: 'Unable to find such a city.'
                        })
                    }
                    console.log(result);
                    this.setState({
                        isLoaded: true,
                        city: result.name,
                        temp: result.main.temp,
                        desc: result.weather[0].description,
                        errorVal: ''
                    })
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                // (error) => {
                //     this.setState({
                //         isLoaded: true,
                //         error
                //     });
                // }
            ).catch(err => console.log(err));
    }
    componentDidMount(){
        this.chooseCity();
    }

    render() {
         const { /*error, */isLoaded, city, temp, desc, errorVal } = this.state;
        // if (error === true) {
        //     return <div>Error: Insert correct city name</div>;
        // } else
            if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div>
                    <div>{errorVal}</div>
                    <form>
                        <input
                            type="text"
                            name="city"
                            id="value1"
                            onChange={this.handleInputChange}
                        />
                        <button
                            onClick={this.handleClick}
                        >
                            Show me weather!
                        </button>
                    </form>
                    <div>{city}</div>
                    <div>{temp}</div>
                    <div>{desc}</div>

                </div>
            );
        }
    }
}