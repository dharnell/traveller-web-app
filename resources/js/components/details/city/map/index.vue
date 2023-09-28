<template>
    <div id="container">
        <div class="col-lg-12 pt-4 pt-lg-0 order-2 order-lg-1 content text-center">
            <h4><span class="badge bg-primary" v-if="category">{{ category.category_label }}</span></h4>
        </div>
        <div style="height:500px; width:auto" ref="lmap">
            <l-map v-if="center" :ref="container" v-model:zoom="zoom" :center="center">
                <l-tile-layer
                    :url="(!this.map_details.is_card) ? 'https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}' : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'"
                ></l-tile-layer>

                <l-circle-marker v-if="!this.map_details.is_card" :lat-lng="[this.lat, this.lng]">
                    <l-tooltip>
                        {{ map_details.info.city }}
                    </l-tooltip>
                </l-circle-marker>

                <l-marker v-if="this.map_details.is_card" :lat-lng="[this.lat, this.lng]">
                    <l-tooltip>
                        {{ map_details.name }}
                    </l-tooltip>
                </l-marker>

                <div v-if="!this.map_details.is_card">
                    <l-marker v-for="(detail, index) of map_details.card_details" :key="index" :lat-lng="[detail.geocodes.main.latitude, detail.geocodes.main.longitude]">
                        <l-tooltip>
                            {{ detail.name }} <br /> Address:  {{ detail.location.formatted_address }}
                        </l-tooltip>
                    </l-marker>
                </div>
            </l-map>
        </div>
       
    </div>
</template>

<script>
    import "leaflet/dist/leaflet.css";
    import L from 'leaflet';
    
    import {
        LMap,
        LIcon,
        LTileLayer,
        LMarker,
        LControlLayers,
        LTooltip,
        LPopup,
        LPolyline,
        LPolygon,
        LRectangle,
        LCircleMarker
    } from "@vue-leaflet/vue-leaflet";

    export default {
        props:['map_details', 'container', 'category'],
        components: {
            LMap,
            LTileLayer,
            LIcon,
            LMarker,
            LPopup,
            LTooltip,
            LCircleMarker
        },
        data() {
            return {
                zoom: 13,
                center: null,
                lat: null,
                lng: null,
            };
        },
        mounted() {
            this.lat = (!this.map_details.is_card) ? this.map_details.info.context.geo_bounds.circle.center.latitude : this.map_details.lat
            this.lng = (!this.map_details.is_card) ? this.map_details.info.context.geo_bounds.circle.center.longitude : this.map_details.lng
            this.center = { lat: this.lat, lng: this.lng }
        },
        watch: {
            category: function(newVal, oldVal) {
                if (!this.map_details.is_card) {
                    const lastChildElement = this.$refs.lmap.firstElementChild;
                    lastChildElement?.scrollIntoView({
                        behavior: 'smooth',
                    });
                }
                
            }
        }
    }
</script>

<style scoped>
    #mapContainer {
        width: 100%;
        height: 50vh;
    }
</style>
