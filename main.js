Vue.component ('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template: `
    <div class="product">
            <div class="product-image">
                <img :src="image">
            </div>
            <div class="product-info">
                <h1>{{ title }} </h1>

                <p v-if="inStock">In Stock</p>
                <p v-else class="lineThrough">Out of Stock</p>
                <p> {{ sale }} </p>

                <p> Shipping: {{ shipping }} </p>

                <p style="text-decoration: underline;">Details</p>
                <ul>
                    <li v-for="detail in details"> {{ detail }} </li>
                </ul>

                <div v-for="(variant, index) in variants"
                            :key="variant.variantId"
                            class="color-box"
                            :style="{backgroundColor: variant.variantColor}"
                            @mouseover="updateProduct(index)">
                </div>

                <span v-for="size in sizes"> {{ size }}, </span></p>

                <button v-on:click="addToCart" 
                        :disabled="!inStock"
                        :class="{ disabledButton: !inStock }">Add to Cart</button>
                <button v-on:click="removeItem">Remove Item</button>
                <div class="cart">
                    <p>Cart ({{ cart }})</p>
                </div>
                <!-- <a :href="link">Learn more</a> -->
            </div>
        </div>
        </div>
        `,
        data() {
            return {
                brand: "Ceylon",
                product: "Socks",
                selectedVariant: 0,
                link: "http://google.com",
                inventory: 0,
                onSale: true,
                details: ['80% cotton', '20% polyester', 'Gender-neutral'],
                variants: [
                    {
                        variantId: 1124,
                        variantColor: "green",
                        variantImage: "socks-green.jpg",
                        variantQuantity: 15
                    },
                    {
                        variantId: 1125,
                        variantColor: "blue",
                        variantImage: "socks-blue.jpg",
                        variantQuantity: 0
                    }
                ],
                sizes: ["S", "M", "L", "XL"],
                cart: 0
            }
        },
        methods: {
            addToCart: function() {
                this.cart++
            },
            removeItem: function() {
                if (this.cart > 0) this.cart--
            },
            updateProduct: function(index) {
                this.selectedVariant = index;
                console.log(index);
            }
        },
        computed: {
            title() {
                return this.brand + ' ' + this.product
            },
            image() {
                return this.variants[this.selectedVariant].variantImage
            },
            inStock() {
                return this.variants[this.selectedVariant].variantQuantity
            },
            sale() {
                if (this.onSale) 
                    return this.brand + ' ' + this.product + ' are on SALE!'
                else 
                    return this.brand + ' ' + this.product + ' are not on SALE!'
            },
            shipping() {
                if (this.premium)
                    return "Free"
                else 
                    return 3.99
            }
        }
})

var app = new Vue({
    el: "#app",
    data: {
        premium: false
    }
})