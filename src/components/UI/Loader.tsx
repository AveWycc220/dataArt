import React from 'react'
import { ReactComponent as ReactSVGLoader } from '../../assets/loader.svg'
import './styles/Loader.scss'

const Loader: React.FC = (): JSX.Element => (
    <div className="loader-ui">
        <ReactSVGLoader />
    </div>
)

export default Loader