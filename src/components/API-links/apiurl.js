export default {
    // Mainurl: "http://bestech.la/random-api/",
    // Mainurl: "http://192.168.100.51:8080/",
    Mainurl: "http://192.168.100.100:8080/",
    photo: "http://bestech.la/images/",
    photoEvent: "http://bestech.la/images/",

    // User API
    createUser : "api/v1/auth/users",
    loginedUser: 'api/v1/auth/user',
    getUser: "api/v1/auth/user",
    getSingleUser: "api/v1/auth/user",
    updateUser: 'api/v1/auth/user/',
    deleteUser: "api/v1/auth/user/",

    // Event API
    createEvent: 'api/v1/event',
    getEvent: 'api/v1/event',
    getsingleEvent: 'api/v1/event/',
    updateEvent: 'api/v1/event/',
    deleteEvent: 'api/v1/event/',

    // Week API
    createWeek: 'api/v1/week',
    getWeek: 'api/v1/week',
    putWeek: 'api/v1/week/',
    deleteWeek: 'api/v1/week/',
    getWeekUID: 'api/v1/week/',


    // Candidates API
    getCandidate: 'api/candidates/v1',
    postCandidate: 'api/candidates/v1',
    candidates: 'api/candidates/v1/',

    // Prize API
    createPrize: 'api/prizes/v1',
    getPrize: 'api/prizes/v1',
    getSinglePrize: 'api/prizes/v1/id/',
    updatePrize: 'api/prizes/v1/',
    deletePrize: 'api/v1/prize/',
    getPrizeKey: 'api/prizes/v1/12345-6789-00000-Luckydraw-Web-Med',

    // Periods API
    createPeriod: 'api/v1/times',
    getPeriod: 'api/v1/times',
    getPeriodV2: 'api/v2/times',

    // Winner API
    getWinner: 'api/winners/v1',
    postWinner: 'api/winners/v1/',

    // Banner API
    createBanner: 'api/v1/banner',
    getBanner: 'api/v1/banner',
    updateBanner: 'api/v1/banner/',
    deleteBanner: 'api/v1/banner/',

    //About API
    getAbout: 'api/v1/about',
    putAbout: 'api/v1/about/3',

    //Province API
    getProvince: 'api/province/getallprovince',
    postProvince: 'api/province/addprovince',
    putProvince: 'api/province/update/',
    deleteProvince: 'api/province/delete/',

    //District API
    getDistrict: 'api/district/getalldistrict',
    postDistrict: 'api/district/adddistrict/',
    putDistrict: 'api/district/update/',
    deleteDistrict: 'api/district/delete/',

    //Bils API
    postBil: 'api/bils/v1',
    getBil: 'api/bils/v1',

    //Random API
    getRandom: 'api/winners/v1/random'
}