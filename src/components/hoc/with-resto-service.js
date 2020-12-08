import React from 'react';
import RestoServiceContext from '../resto-service-context';

// Компонент высшего порядка, функциональная обертка для компонента.
const WithRestoService = () => (Wrapped) => {
    return (props) => {
        return (
            <RestoServiceContext.Consumer>
                {/* Функциальный способ получения пропсов через контекст */}
                {
                    (RestoService) => {
                        return <Wrapped {...props} RestoService={RestoService} />
                    }
                }
            </RestoServiceContext.Consumer>
        )
    };
};

export default WithRestoService;