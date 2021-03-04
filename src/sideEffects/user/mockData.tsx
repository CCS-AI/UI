export default {
    userMenu: {
        configuration: {
            items: [
                {
                    key: 'STATUS',
                    name: 'STATUS',
                    type: 'DROPDOWN',
                    items: [
                        {
                            key: 'AVAILABLE',
                            value: 'AVAILABLE'
                        },
                        {
                            key: 'BUSY',
                            value: 'BUSY'
                        },
                        {
                            key: 'DO_NOT_DISTURB',
                            value: 'DO_NOT_DISTURB'
                        },
                        {
                            key: 'OOTO',
                            value: 'OOTO'
                        }
                    ]
                },
                {
                    key: 'SIGN_OUT',
                    name: 'SIGN_OUT',
                    type: 'BUTTON'
                }
            ]
        }
    }
};
