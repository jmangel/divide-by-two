import React, { useState } from 'react';
import { slide as Menu } from 'react-burger-menu'
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdClose } from 'react-icons/md';
import { Button, Toast, ToastBody } from 'reactstrap';

const styles = {
  bmBurgerButton: {
    width: '36px',
    height: '30px',
    right: '36px',
    top: '36px',
    fontSize: '18px',
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
    borderBottom: '0.01rem solid var(--secondary-bg-color)',
    color: 'white',
    textDecoration: 'none',
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
  const [showCopyToast, setShowCopyToast] = useState(false);

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
      <a
        className="menu-item"
        onClick={() => {
          const el = document.createElement('textarea');
          el.value = window.location.href;
          document.body.appendChild(el);
          el.select();
          document.execCommand('copy');
          document.body.removeChild(el);
          setShowCopyToast(true);
          setTimeout(() => {setShowCopyToast(false)}, 3000);
        }}
      >
        Copy current song link to share
      </a>
      <a id="feedback" className="menu-item" href="mailto:songscaler+feedback@gmail.com">Send Feedback</a>
      <Toast
        style={{ bottom: '1rem', position: 'fixed', backgroundColor: 'var(--secondary-bg-color)' }}
        isOpen={showCopyToast}
      >
        <ToastBody>
          Link copied to clipboard
        </ToastBody>
      </Toast>
    </Menu>
  );
}

export default SidebarMenu;