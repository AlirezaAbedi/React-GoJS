import React, { Component } from 'react';

class Navbar extends Component {
    state = {}
    render() {
        return (<nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
            <div class="sidebar-sticky pt-3">
                <ul class="nav flex-column">
                    <li class="nav-item">
                        <a class="nav-link active" href="/home">
                            <span data-feather="home"></span>
                Home
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/entityrelationship">
                            <span data-feather="file"></span>
                            Entity Relationship
              </a>
                    </li>
                </ul>


            </div>
        </nav>);
    }
}

export default Navbar;