function searchForResults() {
    let keyword = document.getElementById('search_text').value;
    if (!keyword) {
        return;
    }
    keyword = keyword.toLowerCase();
    // filtering keyword
    if (keyword == 'beaches') {
        keyword = 'beach';
    }
    if (keyword == 'temples') {
        keyword = 'temple';
    }
    if (keyword == 'countries') {
        keyword = 'country';
    }
    // fetching data from api
    fetch('travel_recommendation_api.json')
        .then(response => {
            return response.json();
        })
        .then(data => {
            let results;
            let search_results = document.getElementById('search_results');

            const options = { timeZone: 'America/Toronto', hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' };
            const torontoTime = new Date().toLocaleTimeString('en-US', options);
            results+= '<div class="time">' + 'Current time in Toronto:' + torontoTime + '</div>';
            results+= '<br/><br/>';
            switch (keyword) {
                case 'beach':
                    results+= '<div>';
                    for (let i in data.beaches) {
                        results+= '<div class="tile">';
                            results+= '<img src="' + data.beaches[i].imageUrl + '" width="300" />';
                            results+= '<div class="tile_header">' + data.beaches[i].name + '</div>';
                            results+= '<div class="tile_description">' + data.beaches[i].description + '</div>';
                        results+= '</div>';
                        results+= '<br style="clear: both;"/>';
                        results+= '<br/>';
                    }
                    results+= '<div>';
                    break;
                case 'country':
                    results+= '<div>';
                    for (let i in data.countries) {
                        for (let j in data.countries[i].cities) {
                            results+= '<div class="tile">';
                                results+= '<img src="' + data.countries[i].cities[j].imageUrl + '" width="300" />';
                                results+= '<div class="tile_header">' + data.countries[i].cities[j].name + '</div>';
                                results+= '<div class="tile_description">' + data.countries[i].cities[j].description + '</div>';
                            results+= '</div>';
                            results+= '<br style="clear: both;"/>';
                            results+= '<br/>';
                        }
                    }
                    results+= '<div>';
                    break;
                case 'temple':
                    results+= '<div>';
                    for (let i in data.temples) {
                        results+= '<div class="tile">';
                            results+= '<img src="' + data.temples[i].imageUrl + '" width="300" />';
                            results+= '<div class="tile_header">' + data.temples[i].name + '</div>';
                            results+= '<div class="tile_description">' + data.temples[i].description + '</div>';
                        results+= '</div>';
                        results+= '<br style="clear: both;"/>';
                        results+= '<br/>';
                    }
                    results+= '<div>';
                    break;
                default:
                    results = '';
            }
            search_results.innerHTML = results;
            search_results.style.display = 'block';
            return true;
        })
        .catch(error => {
            console.log('Error occured.', error);
        });
}

function clearTheResults() {
    let search_results = document.getElementById('search_results');
    search_results.innerHTML = '';
    let search_text = document.getElementById('search_text');
    search_text.value = '';
}