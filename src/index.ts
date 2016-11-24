import * as i18next from 'i18next';

i18next.init({
    lng: 'en',
    resources: {
        en: {
            translation: {
                'key': 'hello world'
            }
        }
    }
});

console.log(i18next.t('key'));

import './app/index.scss';
import './system/system.config';
import './libs/libs';
import './system/router.tsx';