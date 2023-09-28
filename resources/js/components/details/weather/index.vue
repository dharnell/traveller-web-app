<template>
    <section class="weather" ref="weather">
        <div class="container">

            <div class="row">
                <div class="col-lg-12 pt-4 pt-lg-0 order-2 order-lg-1 content text-center">
                    <h3>{{ city }}'S WEATHER FORECAST</h3>
                </div>
            </div>

        </div>
    </section>

    <section class="weather_widget">
        <div class="container">

            <div class="row">
                
                
                <div class="col-lg-8 pt-4 pt-lg-0 order-2 order-lg-1 content">
                    <div id="openweathermap-widget-1"></div>
                </div>
                <div class="col-lg-4 order-1 order-lg-2">
                    <div id="openweathermap-widget-5"></div>
                </div>
            </div>

        </div>
    </section>
</template>

<script>
    export default {
        props: ['city', 'weather_data'],
        created() {
            
        },
        mounted() {
            if (this.weather_data) {
                this.setWeather()
            }
            const lastChildElement = this.$refs.weather.lastElementChild;
            lastChildElement?.scrollIntoView({
                behavior: 'smooth',
            });
        },
        methods: {
            async setWeather() {
                this.weather_data.widgets.forEach((container, index) => {
                    this.renderWWeatherWidget(container[0], container[1]);
                });
                
                
            },
            renderWWeatherWidget(id, container) {
                window.myWidgetParam ? window.myWidgetParam : window.myWidgetParam = [];  
                window.myWidgetParam.push({id: id, cityid: this.weather_data.city_id ,appid: this.weather_data.app_id, units: 'metric',containerid: container,  });
                (function() {
                    const script = document.createElement('script');
                    script.async = true;
                    script.src = "//openweathermap.org/themes/openweathermap/assets/vendor/owm/js/weather-widget-generator.js";
                    const s = document.getElementsByTagName('script')[0];s.parentNode.insertBefore(script, s);  
                })()
            }
        }
    }
</script>

