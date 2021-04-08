import React, { useEffect, useState } from 'react';
import { slide as Menu } from 'react-burger-menu'
import { BsToggleOff, BsToggleOn } from 'react-icons/bs';
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdClose } from 'react-icons/md';
import { Button, DropdownToggle, Toast, ToastBody, Tooltip, UncontrolledDropdown } from 'reactstrap';
import { parseUrl, stringify } from 'query-string';
import { openDb } from './indexedDb';
import { BiHelpCircle } from 'react-icons/bi';

const styles = {
  bmBurgerButton: {
    width: '36px',
    height: '30px',
    right: '36px',
    top: '36px',
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

const storeName = 'songs';

async function loadSong(songTitle: IDBValidKey) {
  const db = await openDb();

  const value = await db.get(storeName, songTitle);
  if (value) window.location.href = value;
}

const SidebarMenu: React.FC<{
  goHome: () => void,
  songTitle: string,
  showTargetNotes: boolean,
  toggleShowTargetNotes: () => void,
}> = ({
  goHome,
  songTitle,
  showTargetNotes,
  toggleShowTargetNotes
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [showCopyToast, setShowCopyToast] = useState(false);

  const [songTitles, setSongTitles] = useState([] as IDBValidKey[]);
  const [showSavedSongs, setShowSavedSongs] = useState(false);

  const [targetNotesTooltipOpen, setTargetNotesTooltip] = useState(false);

  const toggleTargetNotesTooltip = () => setTargetNotesTooltip(!targetNotesTooltipOpen);

  async function loadSongTitles() {
    const db = await openDb();

    const keys = await db.getAllKeys(storeName);
    console.warn(keys);
    setSongTitles(keys);
  }

  useEffect(() => { loadSongTitles() }, []);

  async function storeSong(songTitle: string) {
    const db = await openDb();

    const { query } = parseUrl(window.location.href);
    const stringifiedQuery = `?${stringify(query)}`;

    await db.put(storeName, stringifiedQuery, songTitle);
    loadSongTitles();
  }

  async function deleteStoredSong(songTitle: IDBValidKey) {
    const db = await openDb();

    await db.delete(storeName, songTitle);
    loadSongTitles();
  }

  const toggleShowSavedSongs = () => {
    setShowSavedSongs(showingSavedSongs => !showingSavedSongs);
  }

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
      id="sidebar-menu"
    >
      <a id="home" className="menu-item" onClick={() => { goHome(); setIsOpen(false); } }>Home</a>
      <a
        className="menu-item"
        onClick={() => storeSong(songTitle)}
      >
        Save Current Song
      </a>
      { songTitles.includes(songTitle) && (
        <a
          className="menu-item"
          onClick={() => deleteStoredSong(songTitle)}
        >
          Delete Current Saved Song
        </a>
      )}
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
        Copy Link to Share Song
      </a>
      <UncontrolledDropdown toggle={() => toggleShowSavedSongs()}>
        <DropdownToggle caret tag="a" className="menu-item">
          Saved Songs
        </DropdownToggle>
      </UncontrolledDropdown>
      { showSavedSongs && songTitles.map(savedSongTitle => (
        <a
          className="menu-item pl-5"
          onClick={() => loadSong(savedSongTitle)}
        >     {savedSongTitle}</a>
      )) }
      <a className="menu-item" onClick={() => toggleShowTargetNotes()}>
        Show Target Notes <BiHelpCircle size='1.5em' id="target-notes-tooltip" className="d-inline" onClick={(e) => e.stopPropagation()} />
        <Tooltip
          container="sidebar-menu"
          placement="bottom"
          trigger="click hover"
          isOpen={targetNotesTooltipOpen}
          target="target-notes-tooltip"
          toggle={() => toggleTargetNotesTooltip()}
        >
          On the piano visualization, highlight the notes from the upcoming chord that are the same as ("common tones") or a semitone away from ("leading tones") notes in the current chord.
        </Tooltip>
        { showTargetNotes ? (
          <BsToggleOn className="float-right" size='1.5em' />
        ) : (
          <BsToggleOff className="float-right" size='1.5em' />
        ) }
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