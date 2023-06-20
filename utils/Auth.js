const ISSERVER = typeof window === 'undefined';

export const login = (miId, token) => {
    if(!ISSERVER) {
        localStorage.setItem('miId', miId);
        localStorage.setItem('token', token);
    }
}

export const logout = () => {
    if(!ISSERVER) {
        localStorage.removeItem('name');
        localStorage.removeItem('miId');
        localStorage.removeItem('token');
    }
}

export const headers = {
    'Authorization': `Bearer ${!ISSERVER ? localStorage.getItem('token') : null}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json'
}

export const isLoggedIn = () => {
    if(!ISSERVER) {
        const miId = localStorage.getItem('miId');
        const token = localStorage.getItem('token');
        if(miId && token)
            return true;
        else
            return false;
    }
    else {
        return false;
    }
}

export const getName = async () => {
    if(!ISSERVER) {
        let token = localStorage.getItem('token');
        let name = localStorage.getItem('name');
        if(token && !name) {
            const res = await fetch('/api/user/fetch-user-details', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            const data = await res.json();
            if(data.status === 'success') {
                localStorage.setItem('name', data.data.name);
                console.log("API cALLEd",data.data.name);
                return data.data.name;
            }
            else {
                return null;
            }
        }
        else if(name) {
            return name;
        }
        else {
            return null;
        }
    }
}

export const isAuthenticated = async () => {
    if(!ISSERVER) {
        let token = localStorage.getItem('token');
        if(token) {
            const res = await fetch('/api/auth/verify-jwt', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            const data = await res.json();
            if(data.status === 'success') {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    }
}

export const getMiId = () => {
    if(!ISSERVER) {
        return localStorage.getItem('miId');
    }
}

export const get2FAStatus = async () => {
    if(!ISSERVER) {
        let token = localStorage.getItem('token');
        if(token) {
            const res = await fetch('/api/user/fetch-user-details', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            const data = await res.json();
            if(data.status === 'success') {
                return data.data.has2FA;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    }
}

export const update2FAStatus = async (status) => {
    if(!ISSERVER) {
        let token = localStorage.getItem('token');
        if(token) {
            const res = await fetch('/api/auth/update-2fa', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    status
                })
            })
            const data = await res.json();
            if(data.status === 'success') {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    }
}

export const get2FAQrCode = async () => {
    if(!ISSERVER) {
        let token = localStorage.getItem('token');
        if(token) {
            const res = await fetch('/api/user/fetch-2fa-qr', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            const data = await res.json();
            if(data.status === 'success') {
                return data.data;
            }
            else {
                return null;
            }
        }
    }
}

export const isDetailsFilled = () => {
    if(!ISSERVER) {
        let posId = localStorage.getItem('posId');
        let storeName = localStorage.getItem('storeName');
        let storeCity = localStorage.getItem('storeCity');
        let storeState = localStorage.getItem('storeState');
        let storeType = localStorage.getItem('storeType');

        if(posId && storeName && storeCity && storeState && storeType) {
            return true;
        }
        else {
            return false;
        }
    }
}

export const getStoreDetails = () => {
    if(!ISSERVER) {
        let posId = localStorage.getItem('posId');
        let storeName = localStorage.getItem('storeName');
        let storeCity = localStorage.getItem('storeCity');
        let storeState = localStorage.getItem('storeState');
        let storeType = localStorage.getItem('storeType');

        if(posId && storeName && storeCity && storeState) {
            return {
                posId,
                storeType,
                storeName,
                storeCity,
                storeState
            }
        }
        else {
            return null;
        }
    }
}