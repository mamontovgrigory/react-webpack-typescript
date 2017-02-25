import * as React from 'react';

interface Props {

}

interface State {

}

class Groups extends React.Component<Props, State> {
    render() {
        return (
            <h4>{i18next.t('groups')}</h4>
        )
    }
}

export default Groups;