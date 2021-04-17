<template>
    <b-navbar toggleable="lg" type="dark" class="header-nav">
        <b-navbar-brand
            href="#"
            class="brand"
            :class="{ 'navbar-hidden': !showBrand }"
        >
            <img
                width="103.72"
                alt="CC logo"
                src="../../assets/img/Construction-Check_Logo_Horiz_Tagline2_CMYK.png"
            />
        </b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav class="ml-auto margin-right mobile-menu">
                <div id="blockContainer">
                    <div
                        class="menu-line align-items-center small-font-parent justify-content-end"
                    >
                        <div class="menu-line small-font">
                            <b-nav-item
                                href="https://beta.constructioncheck.io/#about_us"
                                >About Us</b-nav-item
                            >
                            <!-- <b-nav-item href="https://beta.constructioncheck.io"><router-link to="#">About Us</router-link></b-nav-item> -->
                            <b-nav-item
                                href="https://beta.constructioncheck.io/resources/"
                                >Resources</b-nav-item
                            >
                            <b-nav-item
                                href="https://beta.constructioncheck.io/#hiring"
                                >Hiring</b-nav-item
                            >
                            <b-nav-item
                                href="https://beta.constructioncheck.io/#contact_us"
                                >Contact Us</b-nav-item
                            >
                            <!-- <b-nav-item href="#"><router-link to="/signup">Sign Up</router-link></b-nav-item> -->
                        </div>
                        <div class="login-button">
                            <b-nav-item href="https://beta.constructioncheck.io"
                                ><b-button class="btn-style" type="submit"
                                    ><a
                                        hre
                                        f="https://beta.constructioncheck.io"
                                        style="color: white !important"
                                        >Log in</a
                                    ></b-button
                                ></b-nav-item
                            >
                        </div>
                    </div>
                    <div
                        class="menu-line margin-top-mobile align-items-center big-font"
                    >
                        <b-nav-item
                            href="https://beta.constructioncheck.io/#services"
                            >PRODUCTS</b-nav-item
                        >
                        <b-nav-item
                            href="https://beta.constructioncheck.io/#how_it_works"
                            >HOW IT WORKS</b-nav-item
                        >
                        <b-nav-item
                            href="https://beta.constructioncheck.io/#pricing"
                            >PRICING</b-nav-item
                        >
                        <b-nav-item
                            href="https://beta.constructioncheck.io/#security"
                            >SECURITY & COMPLIANCE</b-nav-item
                        >
                    </div>
                </div>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</template>
<!--  url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGhlaWdodD0iMC44Njg0MjFpbiIgc3R5bGU9InNoYXBlLXJlbmRlcmluZzpnZW9tZXRyaWNQcmVjaXNpb247IHRleHQtcmVuZGVyaW5nOmdlb21ldHJpY1ByZWNpc2lvbjsgaW1hZ2UtcmVuZGVyaW5nOm9wdGltaXplUXVhbGl0eTsgZmlsbC1ydWxlOmV2ZW5vZGQ7IGNsaXAtcnVsZTpldmVub2RkIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAxMzY0IDExNDIiIHdpZHRoPSIxLjAzNzYzaW4iIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+CiAgIDwhW0NEQVRBWwogICAgLmZpbDEge2ZpbGw6I0ZFRkVGRX0KICAgIC5maWwwIHtmaWxsOiMyMDFFMUV9CiAgIF1dPgogIDwvc3R5bGU+PC9kZWZzPjxnIGlkPSJMYXllcl94MDAyMF8xIj48ZyBpZD0iXzU4NjY4NjUzNiI+PGVsbGlwc2UgY2xhc3M9ImZpbDAiIGN4PSI2ODIiIGN5PSI5MzgiIHJ4PSI2ODIiIHJ5PSIyMDMiLz48cGF0aCBjbGFzcz0iZmlsMCIgZD0iTTEwODAgMjI0Yy01Miw2NyAtMTA2LDEzNCAtMTU5LDIwMiA0NSwzNiA4OSw3MiAxMzMsMTA5IDYzLDU1IDEzMiwxMDUgMTcyLDE4MSAyNiw0OSAtMywxMDMgLTQ3LDExOSAtOCwxMiAtMTcsMjQgLTI1LDM2IC0yNiwzNSAtNTAsNzAgLTk2LDc5IC0xLDAgLTEsMSAtMiwxIC04OCw1MCAtMjA5LC04OCAtMjY3LC0xNDEgLTMyLC0yOCAtNjMsLTU1IC05NCwtODMgLTcwLDEwMSAtMTM1LDIwNSAtMTkwLDMxNSAtMTMsMjYgLTM4LDQyIC02NSw0NCAtNjQsMjEgLTEzMCwtMTggLTE4MiwtNTQgLTUwLC0zNCAtOTgsLTcyIC0xMzMsLTEyMyAtNDQsLTI4IC01OCwtOTIgLTE4LC0xMzUgOSwtMTAgMTksLTIxIDI4LC0zMSAyLC0xIDMsLTIgNCwtMyA4NSwtODkgMTczLC0xNzUgMjYyLC0yNTkgLTgwLC02MiAtMTYwLC0xMjYgLTIzMSwtMTk5IC00MCwtNDAgLTI0LC0xMDMgMTgsLTEyOCA1NSwtNjAgMTI4LC05OCAxOTcsLTE0MCA0OSwtMjkgMTA2LC01IDEyNiw0MSAzMCwyNyA1NCw1OCA4MCw4OCA0LDMgNyw1IDEwLDhsNjQgMzQgLTE0IDE4YzgsNyAxNywxNCAyNSwyMiA1OSwtNTYgMTE4LC0xMTMgMTc1LC0xNzEgMTUsLTQxIDY1LC02OCAxMTEsLTQ3IDI4LDE0IDU2LDI3IDg0LDQyIDQ3LDQgODgsNDkgODAsOTkgLTEsMzEgLTE5LDYxIC00Niw3NnoiLz48cGF0aCBjbGFzcz0iZmlsMSIgZD0iTTExNjkgNzQ2Yy0zNCwtNjUgLTEwMiwtMTE1IC0xNTcsLTE2MyAtNTksLTUwIC0xMjAsLTk5IC0xODAsLTE0NyA2OSwtODggMTQwLC0xNzcgMjA5LC0yNjYgMTMsMCAyMywtMTUgMjEsLTI4IDYsLTE3IC0xNSwtMzUgLTMxLC0yOCAtMzEsLTE4IC02NSwtMzQgLTk2LC00OSAtMTMsLTYgLTI4LDcgLTIzLDE5IC03Niw3NyAtMTU1LDE1MiAtMjM0LDIyNyAtMzMsLTI4IC02NiwtNTcgLTk4LC04NyAwLDAgMCwwIDAsMCAtMSwtNiAtMywtMTEgLTgsLTE1IC0yLC0yIC00LC0zIC01LC00bDAgMGMwLDAgLTEsMCAtMSwtMSAtNiwtNCAtMTIsLTkgLTE4LC0xMyAtMzAsLTM1IC01OSwtNzMgLTkzLC0xMDAgLTEsLTE3IC0xOCwtMzMgLTM3LC0yMiAtNjIsMzggLTEzOSw3NyAtMTg3LDEzMyAtMSwyIC0yLDQgLTMsNiAtMTMsMCAtMjMsMTkgLTEzLDMwIDg3LDg4IDE4NywxNjMgMjg0LDIzOSAtMTA4LDEwMSAtMjE1LDIwMyAtMzE2LDMxMCAtMSwwIC0xLDEgLTIsMSAtOSwxMCAtMTgsMTkgLTI3LDI5IC0xNiwxNyAtMywzOSAxNCw0MiAzMSw1MCA3OCw4OCAxMjYsMTIxIDMzLDIyIDkzLDYzIDEzNCw0MyA4LDEgMTYsLTEgMjAsLTkgNjcsLTEzNSAxNDksLTI2MSAyMzYsLTM4MiA0OSw0MyA5OCw4NyAxNDcsMTMwIDE0LDEyIDE3NCwxODEgMjAxLDEyNSA0LDEgOCwxIDEyLDEgMjUsLTUgNDUsLTM2IDU4LC01NSAxNCwtMTkgMjksLTQwIDQxLC02MCAxNywxMSAzNSwtMTIgMjYsLTI3eiIvPjwvZz48L2c+PC9zdmc+") -->
<script>
export default {
    name: 'Header',
    data() {
        return {
            showBrand: true,
            lastScrollPosition: 0,
        };
    },
    mounted() {
        this.lastScrollPosition = window.pageYOffset;
        window.addEventListener('scroll', this.onScroll);
        const viewportMeta = document.createElement('meta');
        viewportMeta.name = 'viewport';
        viewportMeta.content = 'width=device-width, initial-scale=1';
        document.head.appendChild(viewportMeta);
    },

    beforeDestroy() {
        window.removeEventListener('scroll', this.onScroll);
    },

    methods: {
        onScroll() {
            if (window.pageYOffset < 0) {
                return;
            }
            if (Math.abs(window.pageYOffset - this.lastScrollPosition) < 80) {
                return;
            }
            this.showNavbar = window.pageYOffset < this.lastScrollPosition;
            this.lastScrollPosition = window.pageYOffset;
            if (this.lastScrollPosition < 70) {
                this.showBrand = false;
            } else this.showBrand = true;
        },
    },
};
</script>

<style scoped>
.header-nav {
    position: fixed;
    top: 0;
    height: auto;
    width: 100%;
    z-index: 10000;
    padding: 11px;
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}
.margin-right {
    margin-right: 12%;
}
nav {
    background-image: url('../../assets/img/background.png');
    background-color: #0c2340;
    background-repeat: no-repeat;
    height: 100px;
    width: auto;
}
a {
    color: #e5e8eb !important;
    font-weight: 800 !important;
    padding: 0px;
}
a:hover {
    text-decoration: none;
}
.brand {
    width: 10%;
    margin-right: 10%;
    margin-left: 10% !important;
    transform: translate3d(0, 0, 0);
    transition: 0.1s all ease-out;
    margin-bottom: 8px;
}
.form-inline li {
    padding-right: 40px !important;
}
.login-button button {
    background-color: #df7b00 !important;
}
.menu-line {
    display: flex;
}
.navbar-nav {
    display: block !important;
}
.btn-style {
    border-radius: 0px !important;
    padding: 3px 20px 3px 20px;
    border: none !important;
    background-color: #df7b00 !important;
}
.small-font a {
    font-size: 0.95em !important;
    color: #df7b00 !important;
}
.small-font a {
    padding-top: 0px !important;
    padding-bottom: 0px !important;
}
.navbar-hidden {
    opacity: 0 !important;
    transform: opacity 3s ease-in-out;
}

.big-font a {
    padding-top: 0px !important;
    padding-bottom: 0px !important;
    font-weight: bold;
    font-size: 1em;
}

.small-font-parent btn {
    padding: 0px 0px 0px 20px;
    font-size: 0.8em !important;
}

.small-font .nav-item {
    padding: 0px 0px 0px 0px;
}

.nav-item {
    font-size: 1.1em;
    padding: 0px 20px 0px 0px;
}

@media only screen and (max-width: 1500px) {
    .form-inline li {
        padding-right: 10px !important;
    }
}
@media only screen and (max-width: 600px) {
    .brand {
        width: 10%;
        margin-right: 10%;
        margin-left: 10% !important;
        transform: translate3d(0, 0, 0);
        transition: 0.1s all ease-out;
        margin-bottom: 8px;
    }
}
@media only screen and (max-width: 1200px) {
    .form-inline li {
        padding-right: 0px !important;
    }
}
@media only screen and (max-width: 1400px) {
    .navbar-brand img {
        width: 135px;
        height: auto;
    }
}
@media only screen and (max-width: 1000px) {
    .ml-5 {
        margin-left: 0rem !important;
    }
    .brand {
        width: 10%;
        margin-right: 10%;
        margin-left: 2% !important;
    }
    .menu-line {
        display: block;
    }
    .block-order {
        order: -1;
    }
    .nav-item {
        font-size: 1.1em;
        padding: 15px 0px 15px 10px;
    }
    .mobile-menu {
        display: flex !important;
        flex-direction: column;
    }
    #blockContainer {
        display: flex;
        flex-direction: column;
    }
    #blockContainer div {
        flex: 1;
    }
    #blockContainer div:nth-of-type(1) {
        -webkit-order: 3;
        order: 3;
    }
    #blockContainer div:nth-of-type(2) {
        -webkit-order: 1;
        order: 1;
    }

    .margin-top-mobile {
        margin-top: 20px;
    }
    .small-font .nav-item {
        padding: 20px 0px 0px 10px;
    }
    .btn-style {
        margin: 20px 0px 20px 0px;
    }
}
</style>
