import http from 'services/http.service';

export async function getGroup() {
    try {
        const response = await http.get(`/groups`);
        return response;
    } catch (e) {
        return Promise.reject(e);
    }
}


