import React, { useState } from 'react'
import styled from "styled-components"
import { Link } from "react-router-dom"
import * as FaIcons from "react-icons/fa"
import axios from 'axios'

import { SidebarData } from "./SidebarData"
import SubMenu from "./SubMenu"
import { IconContext } from "react-icons/lib"
import DropdownButton from "./Dropdown"
import Post from './Post'
import { confirmAlert } from "react-confirm-alert"
import "react-confirm-alert/src/react-confirm-alert.css"
import { useRecoilState } from 'recoil'
import { sessionAtom } from '../state/session'

const Nav = styled.div`
background: #8d88ea;
height: 100px;
display: flex;
justify-content: flex-start;
align-items: center;
`

const NavIcon = styled(Link)`
margin-left: 2rem;
font-size: 2rem;
height: 100px;
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
const PostButton = styled(Link)`
  background: #555;
  color: #fff;
  padding: 10px 20px;
  border-radius: 5px;
  margin-right: 10px;
  text-decoration: none;
  position: absolute;
  right 0%;
  margin-right: 150px
`

const LogoLink = styled(Link)`
  display: block;
`

const SidebarWrap = styled.div`
width: 100%;
`

const Sidebar = () => {
    const [sidebar, setSidebar] = useState(true)
    const [session,] = useRecoilState(sessionAtom)

    const showSidebar = () => {
        // setSidebar(!sidebar) 
        setSidebar(true)
    }
    const postHandler = () => {
        console.log('click')
        confirmAlert({
            customUI: ({ onClose }) => {

                return (
                    // <Confirm msg={'update'} onClose={onClose} onConfirm={() => { editAgent(); onClose() }} />
                    <Post onClose={onClose} onConfirm={(post) => { sendPost(post); onClose() }} />
                )
            }
        })
    }

    const sendPost = async (post) => {
        const body = {
            content: post,
            user: session._id
        }
        console.log('body: ', body)
        try {
            const res = await axios.post(`http://localhost:3004/post`, body)
            console.log(res)
            if (res && res.status === 201) {
                return true
            }
            return false
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <React.Fragment>
            <IconContext.Provider value={{ color: "#fff" }}>
                <Nav>
                    <NavIcon to="#">
                        <FaIcons.FaBars onClick={showSidebar} />
                    </NavIcon>
                    <PostButton onClick={postHandler}>Create Post</PostButton>
                    <LogoLink to="/">
                        <img src="/home/odinzi/dev/CodeBoxx/Fullstack_Codebloggs/client/src/img/CodeBloggs-logo2.png" style={{ marginLeft: "325%", marginRight: "225%", width: "200px" }} alt="CodeBloggs" />
                    </LogoLink>
                    <DropdownButton />
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
        </React.Fragment>
    )
}

export default Sidebar
