import React from 'react';
import Header from '../include/header';
import Navbar from '../include/navbar';
import * as ROUTES from '../../constant/routes';
import Home from '../home';
import Entityrelationship from '../entityrelationship';

import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom';


function App() {
    return (
        <div >
            <Header />
            <div className="container-fluid">
                <div className="row">

                    <Router>
                        <Navbar />
                        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-md-4">
                            <Route path={ROUTES.Home} component={Home} />
                            <Route path={ROUTES.Entityrelationship} component={Entityrelationship} />
                        </main>
                    </Router>
                </div>
            </div>
        </div>
    );
}

export default App;