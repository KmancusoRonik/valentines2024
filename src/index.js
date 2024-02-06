import ReactDOM from 'react-dom/client'
import App from './components/App.js'
import './styles/fonts.scss'
import './styles/global.scss'

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
    <>
        <App />
    </>
)