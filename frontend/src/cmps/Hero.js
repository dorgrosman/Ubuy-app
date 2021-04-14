import React from 'react'
import { Route } from 'react-router';
import SearchBox from './SearchBox/SearchBox';

export default function Hero() {
    return (
        <div className="flex justify-center">
            <section className="hero flex column align-center justify-center">
                <h1 className="hero-txt head">Buy More, Pay Less</h1>
                <h2 className="hero-txt small">Choose your garment, we'll provide the best product</h2>
                <Route render={({ history }) => <SearchBox history={history}></SearchBox>} />
            </section>
        </div>
    )
}
