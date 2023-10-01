import {PublicHoliday} from '../../types';

const PublicHolidayMock: PublicHoliday = {
    date: '2023-01-01',
    localName: 'Nova godina',
    name: 'New Year',
    countryCode: 'ME',
    fixed: true,
    global: true,
    counties: null,
    launchYear: null,
    types: ['Public']
};

const PublicHolidaysListMock: PublicHoliday[] = [
    {
        date: '2023-01-01',
        localName: "Nova godina",
        name: "New Year",
        countryCode: 'ME',
        fixed: true,
        global: true,
        counties: null,
        launchYear: null,
        types: ['Public']
    },
    {
        date: '2023-01-07',
        localName: 'Božić',
        name: 'Christmas',
        countryCode: 'ME',
        fixed: false,
        global: true,
        counties: null,
        launchYear: null,
        types: ['Public']
    },
    {
        date: '2023-05-21',
        localName: 'Dan nezavisnosti',
        name: 'Independence Day',
        countryCode: 'ME',
        fixed: true,
        global: true,
        counties: null,
        launchYear: 2006,
        types: ['Public']
    },
    {
        date: '2023-07-13',
        localName: 'Dan državnosti',
        name: 'Statehood Day',
        countryCode: 'ME',
        fixed: true,
        global: true,
        counties: null,
        launchYear: null,
        types: ['Public']
    },
    {
        date: '2023-05-01',
        localName: 'Proljetni dan',
        name: 'Spring day',
        countryCode: 'ME',
        fixed: true,
        global: true,
        counties: null,
        launchYear: 1918,
        types: ['Public']
    },
    {
        date: '2023-09-04',
        localName: 'Labor Day',
        name: 'Labor Day',
        countryCode: 'US',
        fixed: false,
        global: true,
        counties: null,
        launchYear: 1894,
        types: ['Public']
    },
    {
        date: '2023-07-04',
        localName: 'Independence Day',
        name: 'Independence Day',
        countryCode: 'US',
        fixed: true,
        global: true,
        counties: null,
        launchYear: 1776,
        types: ['Public']
    },
]

export {
    PublicHolidayMock,
    PublicHolidaysListMock
}
