// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//     if (request.message === 'foreground-updatelocation') {

//         console.log('message received');

//         var html_element = '<select name="thePage:SiteTemplate:j_id155:j_id158" size="1" onchange="j_id160_onchange();">	
//         <option value="a0CC000000KUJyeMAH">CHENNAI VAC</option> \
//         <option value="a0CC000000KUJyjMAH">HYDERABAD VAC</option> \
//         <option value="a0CC000000KUJyoMAH" selected="selected">KOLKATA VAC</option> \
//         <option value="a0CC000000KUJytMAH">MUMBAI VAC</option> \
//         <option value="a0CC000000KUJz3MAH">NEW DELHI VAC</option> \
//         </select>'
//         var cities_options = document.querySelector('select').getElementsByTagName('option')
//         var cities_options_selected = document.querySelector('select').value

//         const cities_value_list = ['a0CC000000KUJyeMAH',
//             'a0CC000000KUJyjMAH',
//             'a0CC000000KUJyoMAH',
//             'a0CC000000KUJytMAH',
//             'a0CC000000KUJytMAH']

//         // for (const element of cities_options) {

//         // }

//         const changeSelected = (e) => {
//             const $select = document.querySelector('select');
//             $select.value = cities_options_selected
//         };

//         document.querySelector('.changeSelected').addEventListener('click', changeSelected);
//     }
// });


// var cities_options = document.querySelector('select').getElementsByTagName('option');
// var cities_options_selected = document.querySelector('select').value;

// const changeSelected = (e) => {
//     const $select = document.querySelector('select');
//     // $select.value = cities_options_selected
//     $select.value = 'a0CC000000KUJytMAH'
// };

// document.querySelector('.changeSelected').addEventListener('click', changeSelected);