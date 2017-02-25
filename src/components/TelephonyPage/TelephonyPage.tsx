import * as React from 'react';

interface Props {

}

interface State {

}

class Telephony extends React.Component<Props, State>{
    render(){
        return (
            <h4>{i18next.t('telephony')}</h4>
        )
    }
}

export default Telephony;