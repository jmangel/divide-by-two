import React, { useState } from 'react';
import { slide as Menu } from 'react-burger-menu'
import { GiHamburgerMenu } from 'react-icons/gi';

const styles = {
  bmBurgerButton: {
    width: '36px',
    height: '30px',
    right: '36px',
    top: '36px'
  },
  bmBurgerBars: {
    background: '#fff'
  },
  bmBurgerBarsHover: {
    background: '#a90000'
  },
  bmCrossButton: {
    height: '24px',
    width: '24px'
  },
  bmCross: {
    background: '#bdc3c7'
  },
  bmMenuWrap: {
    position: 'fixed',
    top: '0',
    height: '100%'
  },
  bmMenu: {
    background: '#373a47',
    padding: '2.5em 1.5em 0',
    fontSize: '1.15em'
  },
  bmMorphShape: {
    fill: '#373a47'
  },
  bmItemList: {
    color: '#b8b7ad',
    padding: '0.8em'
  },
  bmItem: {
    display: 'block'
  },
  bmOverlay: {
    background: 'rgba(0, 0, 0, 0.3)'
  }
}

const SidebarMenu: React.FC<{
  goHome: () => void,
}> = ({
  goHome,
}) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Menu
      styles={styles}
      customBurgerIcon={<GiHamburgerMenu />}
      right
      isOpen={isOpen}
      onStateChange={(state) => setIsOpen(state.isOpen)}
    >
      <a id="home" className="menu-item" onClick={() => { goHome(); setIsOpen(false); } }>Home</a>
    </Menu>
  );
}

export default SidebarMenu;