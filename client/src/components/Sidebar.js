import React, { useState } from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"
import * as FaIcons from "react-icons/fa"
// import * as AiIcons from "react-icons/ai"
import { SidebarData } from "./SidebarData"
import SubMenu from "./SubMenu"
import { IconContext } from "react-icons/lib"

const Nav = styled.div`
background: #8d88ea;
height: 80px;
display: flex;
justify-content: flex-start;
align-items: center;
`

const NavIcon = styled(Link)`
margin-left: 2rem;
font-size: 2rem;
height: 80px;
display: flex;
justify-content: flex-start;
align-items: center;
`

const SidebarNav = styled.nav`
background: #333333;
width: 250px;
height: 100vh;
display: flex;
justify-content: center;
position: fixed;
top: 0;
left: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
transition: 350ms;
z-index: 10;
`

const SidebarWrap = styled.div`
width: 100%;
`

const Sidebar = () => {
    const [sidebar, setSidebar] = useState(true)

    const showSidebar = () => {
        // setSidebar(!sidebar) 
        setSidebar(true)
    } 

    return (
        <>
            <IconContext.Provider value={{ color: "#fff" }}>
                <Nav>
                    <NavIcon to="#">
                        <FaIcons.FaBars onClick={showSidebar} />
                    </NavIcon>
                    <h1

                        style={{
                            textAlign: "center",
                            marginLeft: "200px",
                            
                        }}
                    >
                    </h1>
                </Nav>
                <SidebarNav sidebar={sidebar}>
                    <SidebarWrap>
                        <NavIcon to="#">
                            <img src="Untitled.png" alt="CodeBloggs" className="top-left-image" style={{ position: "fixed", width: "50px", height: "50px", left: "20px" }} />
                        </NavIcon>
                        {SidebarData.map((item, index) => {
                            return <SubMenu item={item} key={index} />
                        })}
                    </SidebarWrap>
                </SidebarNav>
            </IconContext.Provider>
        </>
    )
}

export default Sidebar
