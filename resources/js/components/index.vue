<template>
    <section id="hero" class="d-flex align-items-center justify-content-center">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-xl-6 col-lg-8">
                <h1>Hello Traveller!</h1>
                <h2>Welcome to Japan! Where do want to go?</h2>
                </div>
            </div>

            <div class="row gy-4 mt-5 justify-content-center">
                <div class="col-xl-2 col-md-4" v-for="(city, index) of cities" :key="index">
                    <div class="icon-box">
                        <i class="ri-store-line"></i>
                        <h3><a href="" class="city_options" @click="loadDetails($event, city)">{{ city }}</a></h3>
                    </div>
                </div>
                <img src="/images/loading.svg" class="loading" v-if="is_loading"/>
            </div>
           
        </div>
    </section>
    
    <main id="main">
        <Weather :key="weather_key" v-if="search" :city="search" :weather_data="weather_data" />

        <section v-if="search">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12 pt-4 pt-lg-0 order-2 order-lg-1 content text-center">
                        <h3>WELCOME TO {{ search }}</h3>

                        <Multiselect
                            v-model="selected_category"
                            :options="categories"
                            label="category_label"
                            track_by="category_id"
                            placeholder="Select Category"
                            @select="loadLocation()"
                            class="multi_select_class"
                        >

                        </Multiselect>
                    </div>
                    
                </div>
            </div>
        </section>

        <City :key="city_key" v-if="foursquare_data" :foursquare_data="foursquare_data" :category="selected_category" @loadMore="loadMore" :limit="limit"/>
        
    </main>
    
</template>

<script>
    import Weather from './details/weather/index.vue'
    import City from './details/city/index.vue'

    export default {
        components: {
            Weather,
            City
        },
        data() {
            return {
                weather_key: 0,
                city_key: 0,
                search: null,
                cities: [
                    'TOKYO', 'YOKOHAMA', 'KYOTO', 'OSAKA', 'SAPPORO', 'NAGOYA'
                ],
                forecast_api: null,
                app_id: null,
                country_code: "jp",
                city_id : 0,
                weather_data: null,
                weather_url: '',
                city: '',
                widgets: [
                    [1, 'openweathermap-widget-1'],
                    [5, 'openweathermap-widget-5']
                ],
                foursquare_api: null,
                foursquare_api_key: null,
                foursquare_url: '',
                foursquare_fetch_options: '',
                foursquare_data: null,
                limit: 5,
                categories: [],
                selected_category: '',
                is_loading: false
            }
        },
        created() {
            this.forecast_api = import.meta.env.VITE_OPENWEATHER_API
            this.app_id = import.meta.env.VITE_OPENWEATHER_APP_ID
            this.foursquare_api_key = import.meta.env.VITE_FORESQUARE_API_KEY
            this.foursquare_api = import.meta.env.VITE_FORESQUARE_API
        },
        mounted() {
            this.setWidget()
            this.getCategories()
        },
        methods: {
            loadDetails(e, city) {
                e.preventDefault()
                this.$nextTick(() => {
                    this.is_loading = true
                })

                this.search = city
                this.loadWeather()
                
                this.loadLocation()
            },
            setWidget() {
                let weatherWidget = document.createElement('script')
                weatherWidget.setAttribute('src', '//openweathermap.org/themes/openweathermap/assets/vendor/owm/js/d3.min.js')
                document.head.appendChild(weatherWidget)
            },
            loadWeather() {
                const searchUrl = new URL(this.forecast_api)
                searchUrl.searchParams.set('q', this.search+','+this.country_code)
                searchUrl.searchParams.set('appid', this.app_id)
                // searchUrl.searchParams.set('units', 'metric')
                this.weather_url = searchUrl.href
                this.getWeather()
            },
            async getWeather() {
                const response = await fetch(this.weather_url, {
                    method: "GET"
                })

                const data = await response.json()
                this.weather_data = {
                    data: data,
                    city_id: data.city.id,
                    country_code: this.country_code,
                    app_id: this.app_id,
                    widgets: this.widgets
                }
                this.weather_key++
            },
            loadMore(counter) {
                this.limit = this.limit+counter
                this.loadLocation()
            },
            loadLocation() {
                const searchUrl = new URL(this.foursquare_api)
                searchUrl.searchParams.set('near', this.search+','+this.country_code)
                searchUrl.searchParams.set('limit', this.limit)
                if (!this.selected_category) {
                    this.selected_category = this.categories[0]
                }

                searchUrl.searchParams.set('categories', this.selected_category.category_id)
                this.foursquare_url = searchUrl.href

                const options = {
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                        Authorization: this.foursquare_api_key
                    }
                }
                this.foursquare_fetch_options = options
                this.getLocations();
            },
            getLocations() {
                fetch(this.foursquare_url, this.foursquare_fetch_options)
                .then(response => response.json())
                .then(response => {
                    this.foursquare_data = {
                        data: response,
                        city: this.search
                    }
                    this.city_key++
                    this.is_loading = false
                })
                .catch((err) =>{
                    this.is_loading = false
                });
            },
            async getCategories() {
                const response = await fetch('/taxonomy/categories.json', {
                    method: "GET"
                })
                const data = await response.json()
                this.selected_category = data[0]
                this.categories = data
            }
        }
    }
</script>