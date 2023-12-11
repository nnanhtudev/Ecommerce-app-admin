import React from "react";

function Menu(props) {
  return (
    <aside className="left-sidebar" data-sidebarbg="skin6">
      <div className="scroll-sidebar" data-sidebarbg="skin6">
        <nav className="sidebar-nav">
          <ul id="sidebarnav">
            <li className="sidebar-item">
              {" "}
              <a className="sidebar-link sidebar-link" href="/">
                <i data-feather="home" className="feather-icon"></i>
                <span className="hide-menu">Dashboard</span>
              </a>
            </li>
            <li className="list-divider"></li>

            <li className="nav-small-cap">
              <span className="hide-menu">Components</span>
            </li>
            <li className="sidebar-item">
              {" "}
              <a className="sidebar-link sidebar-link" href="/new">
                <i data-feather="settings" className="feather-icon"></i>
                <span className="hide-menu">New Product</span>
              </a>
            </li>
            <li className="sidebar-item">
              {" "}
              <a className="sidebar-link sidebar-link" href="/chat">
                <i data-feather="message-square" className="feather-icon"></i>
                <span className="hide-menu">Customer</span>
              </a>
            </li>
            <li className="sidebar-item">
              {" "}
              <a className="sidebar-link sidebar-link" href="/users">
                <i data-feather="message-square" className="feather-icon"></i>
                <span className="hide-menu">Users</span>
              </a>
            </li>
            <li className="sidebar-item">
              {" "}
              <a className="sidebar-link sidebar-link" href="/products">
                <i data-feather="message-square" className="feather-icon"></i>
                <span className="hide-menu">Product</span>
              </a>
            </li>
            <li className="sidebar-item">
              {" "}
              <a className="sidebar-link sidebar-link" href="/history">
                <i data-feather="message-square" className="feather-icon"></i>
                <span className="hide-menu">History</span>
              </a>
            </li>
            {/* <li className="nav-small-cap">
              <span className="hide-menu">Authentication</span>
            </li> */}
            {/*
						<li className='sidebar-item'>
							{' '}
							<a
								className='sidebar-link sidebar-link'
								href='authentication-register1.html'
								aria-expanded='false'>
								<i data-feather='lock' className='feather-icon'></i>
								<span className='hide-menu'>Register</span>
							</a>
						</li> */}
          </ul>
        </nav>
      </div>
    </aside>
  );
}

export default Menu;
