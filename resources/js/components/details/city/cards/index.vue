<template>
    <div class="row">
        <div class="container">
            <div class="col-lg-12 pt-4 pt-lg-0 order-2 order-lg-1 content text-center" style="margin-top: 20px;">
                <h4>{{ limit }} Locations Shown</h4>
            </div>
        </div>
    </div>
    <section class="cards_content" v-for="(detail, index) of details" :key="index">
        <div class="container">
            <div class="row feature_container">
                <div class="col-lg-12">
                    <h3>{{ detail.name }} </h3>
                    <h6><span v-for="(category, index) of detail.categories" :key="index" class="badge bg-primary">{{ category.name }}</span></h6>
                </div>
                <div class="image col-lg-6 map_image">
                    <Map :key="index+1" :map_details="{
                            is_card: true,
                            lat: detail.geocodes.main.latitude,
                            lng: detail.geocodes.main.longitude,
                            name: detail.name
                        }" :container="'map_card_container_'+index" category="" />
                </div>

                <div class="col-lg-6 cards">
                    <div class="icon-box mt-5 mt-lg-0" data-aos="zoom-in">
                        <fa-icon icon="fa-solid fa-route" class="card_svg"></fa-icon>
                        <h4> Distance </h4>
                        <p>{{ detail.distance }} km</p>
                    </div>
                    <div class="icon-box mt-5">
                        <fa-icon icon="fa-solid fa-address-card" class="card_svg"></fa-icon>
                        <h4> Address </h4>
                        <p>{{ detail.location.formatted_address }}</p>
                    </div>
                    <div class="icon-box mt-5">
                        <fa-icon icon="fa-solid fa-map-pin" class="card_svg"></fa-icon>
                        <h4>Post Code</h4>
                        <p>{{ detail.location.postcode }}</p>
                    </div>
                    <div class="icon-box mt-5" v-if="detail.related_places">
                        <fa-icon icon="fa-solid fa-route" class="card_svg"></fa-icon>
                        <h4>Related Places</h4>
                        <h6><span class="badge bg-info text-dark" v-for="(related_place, index) of detail.related_places" :key="index">{{ related_place.name }}</span></h6>
                    </div>
                </div>
            </div>
        </div>
    </section>

</template>

<script>
    import { library } from '@fortawesome/fontawesome-svg-core'
    import { faUserSecret, faRoute, faMapPin, faAddressCard} from '@fortawesome/free-solid-svg-icons'
    library.add([faUserSecret, faRoute, faAddressCard, faMapPin])

    import Map from '../map/index.vue'
    export default {
        props: ['details', 'limit'],
        components: {
            Map
        },
        data() {
            return {
                map_details: null
            }
        },
        methods: {
            getCardDetail(detail) {
                const map_details = {
                    is_card: true,
                    lat: detail.geocodes.main.latitude,
                    lng: detail.geocodes.main.longitude,
                    name: detail.name
                }

                return map_details
            }
        }
    }
</script>

<style>
    .badge {
        margin-right: 0.5em;   
    }
</style>