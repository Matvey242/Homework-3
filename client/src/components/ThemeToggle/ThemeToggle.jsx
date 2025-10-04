import { useTheme } from '../../context/theme/useTheme'
import { IoSunny, IoMoon } from "react-icons/io5"
import { IoIosSettings } from 'react-icons/io'
import styles from './ThemeToggle.module.css'
import { useState } from 'react'
import cn from 'classnames'

function ThemeToggle() {
    const { theme, toggleTheme } = useTheme()
    const [open, isOpen] = useState(false)

    const setOpen = () => isOpen(prev => !prev)

	const ThemesContainer = cn(styles['Themes'], {
		[styles.active]: open
	})

    const SettingOpen = cn(styles['settingBlock'], {
		[styles.active]: open
	})

    const Setting = cn(styles['setting'], {
		[styles.active]: open
	})

	return (
        <div className={styles["container"]}>
            <h2>Notes App</h2>
		<container onClick={setOpen} className={ThemesContainer}>
            <IoIosSettings className={Setting} />
            <div className={SettingOpen}>
            <IoSunny className={styles['light']} onClick={() => toggleTheme('light')} />
            <IoMoon className={styles['dark']} onClick={() => toggleTheme('dark')} />
            <div className={styles['blue']} onClick={() => toggleTheme('blue')}></div>
            </div>
		</container>
        </div>
	)
}

export default ThemeToggle
