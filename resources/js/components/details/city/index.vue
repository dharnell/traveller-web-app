<template>
    <Map :key="map_key" :map_details="map_details" container="map_container" :category="category"/>
    <Card :details="card_details" :limit="limit" />
    
    <div class="row">
        <div class="container">
            <div class="col-lg-12 pt-4 pt-lg-0 order-2 order-lg-1 content text-center" style="margin-bottom: 20px; margin-top: -30px;">
                <a v-if="(limit < 50) ? true : false" href="" @click="loadMore($event)" class="btn btn-primary">Load More</a>
                <h6 v-if="(limit == 50) ? true : false">No More Items</h6>
            </div>
        </div>
    </div>

    <footer id="footer">
        <div class="container">
            <div class="credits">
                Created by Dharnell C Abluyen | Web and Systems Developer
            </div>
        </div>
    </footer>
</template>

<script>
    import Card from './cards/index.vue'
    import Map from './map/index.vue'

    export default {
        emits: ["loadMore"],
        props: ['foursquare_data', 'category', 'limit'],
        data() {
            return {
                card_details: null,
                info: null,
                results: null,
                context: null,
                map_details: null,
                map_key: 0,
                loaded: 5
            }
        },
        components: {
            Card,
            Map
        },
        created() {
            this.results = this.foursquare_data.data.results
            this.context = this.foursquare_data.data.context
            this.getCardDetails()
        },
        mounted() {
            
        },
        methods: {
            loadMore(e) {
                e.preventDefault()
                this.$emit('loadMore', 5) //Load another 5 items
            },
            getCardDetails() {
                const data_arr = []
                Object.values(this.results).forEach(val => {
                    const data = {}
                    const distance = val.distance / 1000
                    
                    data.name = val.name,
                    data.location = val.location,
                    data.categories = val.categories,
                    data.geocodes = val.geocodes
                    data.distance = distance.toFixed(2)
                    data.related_places = val.related_places.children
                    data_arr.push(data)
                });

                this.map_details = {
                    context: this.context,
                    info: {
                        context: this.context,
                        city: this.foursquare_data.city
                    },
                    card_details: data_arr,
                    is_card: false
                }
                
                this.card_details = data_arr
            }
        }
    }
</script>

