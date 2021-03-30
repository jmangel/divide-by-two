import React, { useState } from 'react';
import { slide as Menu } from 'react-burger-menu'
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdClose } from 'react-icons/md';

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
  bmMenuWrap: {
    position: 'fixed',
    top: '0',
    height: '100%',
    maxWidth: '480px',
    width: '100%',
  },
  bmMenu: {
    background: 'var(--main-bg-color)',
    paddingTop: '2.5em',
    fontSize: '0.875em'
  },
  bmMorphShape: {
    fill: '#373a47'
  },
  bmItemList: {
    padding: '0.8em'
  },
  bmItem: {
    display: 'block',
    width: '100%',
    textAlign: 'left',
    borderBottom: '0.01rem solid #6A8992',
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
      customBurgerIcon={<GiHamburgerMenu onClick={() => setIsOpen(true)} />}
      customCrossIcon={<MdClose style={{backgroundColor: 'transparent'}} />}
      right
      isOpen={isOpen}
      onStateChange={(state) => setIsOpen(state.isOpen)}
      menuClassName="px-3"
      itemListClassName="px-1"
      itemClassName="py-1 px-3"
    >
      <a id="home" className="menu-item" onClick={() => { goHome(); setIsOpen(false); } }>Home</a>
    </Menu>
  );
}

export default SidebarMenu;