<template>
    <div id="app">
      <p class="idle-p">{{ isIdle }}</p>
      <notifications group="notify" />
      <router-view />
    </div>
</template>

<script>
export default {
  name: 'App',
  components: {},
  data() {
    return {
      is_idle: false //If the user didn't do anything it will become true 5mins
    }
  },
  watch: {
    is_idle: function(newVal) {
        this.$notify({
        group: 'notify',
        type: 'error',
        title: 'User session timed out',
        text: 'Please log back in to continue.',
        duration: 3000,
        speed: 1000,
      });
      localStorage.clear();
      this.$router.push('/login');
    }
  },
  computed: {
    //Checking the user's interation if it is idle for 5 mins change the value
    isIdle() {
      this.is_idle = this.$store.state.idleVue.isIdle;
    }
  }
};
</script>

<style lang="css">
@import '~nprogress/nprogress.css';
@import './assets/css/construction-check.css';
  #app {
    font-family: 'Montserrat';
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /*  text-align: center; */
  }
  #nav {
    padding: 30px;
  }
  #nav a {
    font-weight: 900;
    color: #2c3e50;
  }
  #nav a.router-link-exact-active {
    color: #42b983;
  }
  .navbar-dark .navbar-toggler-icon {
    height: 20px;
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAeCAYAAACiyHcXAAAACXBIWXMAAAsTAAALEwEAmpwYAAAGymlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDUgNzkuMTYzNDk5LCAyMDE4LzA4LzEzLTE2OjQwOjIyICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDIwLTA2LTE5VDA5OjExOjU0KzA4OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDIwLTA2LTIwVDAwOjAyOjM3KzA4OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyMC0wNi0yMFQwMDowMjozNyswODowMCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo3MWU4Zjk1Yy1lYTc5LTU1NDAtYWFhMi03MTczMTk4N2JhOTgiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDpmNDE0ZDkzZS1jYTJjLWNlNDQtODEyYy0xOGI4M2U1N2VhOTgiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDplNDU4NDI0Yi1jZDk0LWIxNDQtYWY0OS0wMTQ5MzE2Njk3YjAiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiBwaG90b3Nob3A6SUNDUHJvZmlsZT0ic1JHQiBJRUM2MTk2Ni0yLjEiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmU0NTg0MjRiLWNkOTQtYjE0NC1hZjQ5LTAxNDkzMTY2OTdiMCIgc3RFdnQ6d2hlbj0iMjAyMC0wNi0xOVQwOToxMTo1NCswODowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo1NGQwMjYwMi05NWMwLTBiNDAtYTc5Yi1kOTMyMmM3ZTZkZWEiIHN0RXZ0OndoZW49IjIwMjAtMDYtMTlUMDk6MTE6NTQrMDg6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE5IChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6NzFlOGY5NWMtZWE3OS01NTQwLWFhYTItNzE3MzE5ODdiYTk4IiBzdEV2dDp3aGVuPSIyMDIwLTA2LTIwVDAwOjAyOjM3KzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+zO5fvgAAAGJJREFUSInt17ENwCAQQ1E7YhAGTZlBs8mlsgRSas6FX3UdXxScYFWh29Dw3jxeM58iAFynD/5jETGWmV0RFjeRCEmEJEISIeuL2bFOs8A2WWCSCEmEJEIsIrI7xCKCDh/iDxTLDEEpRyxFAAAAAElFTkSuQmCC') !important;
  }
  .register-categories .autocomplete-input {
    padding: 5px 10px 5px 40px !important;
    background-color: white !important;
    border: 1px solid #C9C9C9 !important;
    border-radius: 5px !important;
  }
  .create-project-estimate .autocomplete-input {
    padding: 5px 10px 5px 10px;
    background-image: none;
    background-color: white !important;
    border: 1px solid #C9C9C9 !important;
    width: 100% !important;
    border-radius: 5px !important;
  }
  .create-project-estimate .autocomplete-result-list {
    z-index: 100 !important;
  }
  .project_manager_detail .autocomplete-input {
    padding: 5px 10px 5px 10px;
    background-image: none;
    background-color: white !important;
    border: 1px solid #C9C9C9 !important;
    width: 100% !important;
    border-radius: 5px !important;
  }
  .create-project-estimate .autocomplete-result {
    padding: 5px 10px 5px 10px !important;
    background-image: none;
  }
  .not-collapsed .navbar-toggler-icon {
    color: white;
    width: 18px;
    height: 18px;
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAlCAYAAAAuqZsAAAAACXBIWXMAAAsTAAALEwEAmpwYAAAGymlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDUgNzkuMTYzNDk5LCAyMDE4LzA4LzEzLTE2OjQwOjIyICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDIwLTA2LTE5VDA5OjA3OjAzKzA4OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDIwLTA2LTE5VDIzOjU5OjEzKzA4OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyMC0wNi0xOVQyMzo1OToxMyswODowMCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpkMzU0ZTgwMC0zZGUwLTQ2NDgtOTAwYi0yMjYzOTI4YmY5YzIiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDo4YzU2M2QzNC04M2I4LWUyNDktYmM3Yy00OWJlZTFmMmNiNTYiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo5YzI2OTM5My1iZmU2LTliNDgtYTFmOC02NjAxYzllN2EzNzIiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiBwaG90b3Nob3A6SUNDUHJvZmlsZT0ic1JHQiBJRUM2MTk2Ni0yLjEiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjljMjY5MzkzLWJmZTYtOWI0OC1hMWY4LTY2MDFjOWU3YTM3MiIgc3RFdnQ6d2hlbj0iMjAyMC0wNi0xOVQwOTowNzowMyswODowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDpiNjUzMDg2NC1hYjhlLTk2NDctOTZjOS1hZjJhYmE4MmU5ZmIiIHN0RXZ0OndoZW49IjIwMjAtMDYtMTlUMDk6MDc6MDMrMDg6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE5IChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6ZDM1NGU4MDAtM2RlMC00NjQ4LTkwMGItMjI2MzkyOGJmOWMyIiBzdEV2dDp3aGVuPSIyMDIwLTA2LTE5VDIzOjU5OjEzKzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+x81vxAAAASBJREFUWIXNl0sOgkAQRGuIB/GgLj0oNxlXJgjT3dU/Ym00Aq9fAjJTY86Jf8wDAPbX0M6ZANQTAlGZz/fERgCOnxWhmJrY+cIKOZopiUkXZORczJWYNTwi52aexdihHrkQc5MOFA0MM7fzD1GQ85jJ/Ipl3lMrgcyfZAC/t7JKLi0FXB/+rFyJFLB+XVQvP0wuM6UX7J1yy1naknSHnDjDWsQ75VS2JWYCgjGZjBgFcoRisWI0sIrhEbs1HrGOjaIYVqxja62GEeuoUSaTLSMdKSsjHSkrIx0pKyMdKSsjqwwU7oQzZeSYIXz3pqyMSCJpuWwZ0a5LMTNlhDk/zIyWEc/AEDNSRiK3yM30lpHMQ+1iespIx0YxXUY6ttYq8wNpsj5Jzzf+oAAAAABJRU5ErkJggg==') !important;
  }
  .prosubmissionstatus tr{
    border: 1px solid #C9C9C9;
    padding: 10px !important;
    margin-top: 10px !important;
  }
  .navbar-toggler {
    background-color: none !important;
  }
  .navbar-dark .navbar-toggler {
    border-color: #0C2340 !important;
  }
  button:focus {
    outline: none !important;
  }
  td{
    vertical-align: middle !important;
  }
  .modal-header {
    border: none !important;
    padding: 0px !important;
  }
  .table th {
    border-bottom: 1px solid black !important;
    border-top: none !important;
  }
  .btn-primary {
    color: black !important;
    background-color: white !important;
    border: none !important;
    font-size: 13px !important;
    padding: 0px !important;
  }
  table .dropdown-menu.show {
    max-height: 200px !important;
    overflow: auto !important;
  }
  .page-item.active .page-link {
    z-index: 0 !important;
  }
  .project .btn-outline-darker {
    padding-top: 10px;
    padding-bottom: 10px;
    border: 1px solid #C9C9C9 !important;
    border-radius: 2px;
    color: black !important;
    background-color: white;
  }
  .project .dropdown-toggle::after {
    margin-left: 3em !important;
  }
  .project-detail .file-uploads input[type="file"] {
    width: 100% !important;
    height: 100% !important;
    opacity: 0 !important;
  }
  .project-detail .file-uploads label {
    display: none;
  }
  .custom-table-header  .show > .btn-primary.dropdown-toggle {
    background-color: #0C2340 !important;
  }
  .custom-table-header  .btn-group > .btn, .btn-group-vertical > .btn {
    background-color: #0C2340 !important;
    color: white !important;
    display: flex !important;
    align-items: center !important;
  }
  .prosubmissionstatus td{
    border-top: 1px solid #CCCCCC;
    border-bottom: 1px solid #CCCCCC;
    padding: 10px 10px 10px 10px !important
  }
  .prosubmissionstatus th{
    border-top: 1px solid white !important;
    border-left: 1px solid white !important;
    border-right: 1px solid white !important;

  }
  .drawing .custom-control-label {
    align-items: center !important;
    display: flex !important;
    margin-right: 17px;
  }
  .drawing .owl-nav {
    display: none !important;
  }
  .drawing .owl-dots {
    display: none !important;
  }
  .fee-submission .vue-simple-drawer {
    padding: 40px 0px 0px 0px !important;
    background-color: #EEEEEE;
    width: 400px;
    color: black;
  }
  .fee-submission .close-btn{
    width: 8px !important;
    height: 8px !important;
    color: black !important;
    margin-right: 15px !important;
    top: 10px;
  }
  .fee-submission .vue-simple-drawer .close-btn:hover .leftright {
    background-color: #0C2340 !important;
  }
  .fee-submission .vue-simple-drawer .close-btn:hover .rightleft {
    background-color: #0C2340 !important;
  }
  .fee-submission .vue-simple-drawer .close-btn .leftright, .vue-simple-drawer .close-btn .rightleft {
    height: 3px !important;
    width: 18px !important;
    background-color: #0C2340 !important;
    margin-top: 15px !important;
    margin-bottom: 10px !important;
  }
  .input:focus {
    border-color: white !important;
  }

  .estimate-header-filter-bar .form-group {
    margin: 10px 0px !important;
  }
  /* This is the bootstrap tab customize for the design Used dashboard/project request for the project manager */
  .project-request-container .nav-tabs .nav-link.active {
    color: #495057;
    background-color: #fff;
    border-color: #0058DD #fff #fff;
    border-top-width: 3px;
  }
  .project-request-container .nav-item a {
    color: #000000;
    text-decoration: none;
    background-color: #EEEEEE;
    font-size: 12px !important;
    font-weight: 600;
    padding: 0.5rem 1.5rem;
  }
  .project-request-container .nav-tabs {
    border-bottom-width: 0px;
  }
  /* customize table for the design Used dashboard/project request -> client project submission */
  .client-project-submission th{
    padding: 5px 0px !important;
    font-size: 13px !important;
    font-weight: 900 !important;
  }
    /* customize dropdown retangle area to add the slider etc. */
  .client-project-submission .budget .dropdown-menu {
    min-width: 22em;
  }
  .client-project-submission .compensation .dropdown-menu {
    min-width: 22em;
  }
  .client-project-submission .budget .d-flex .bv-no-focus-ring {
    display: flex;
    align-items: center;
  }
  .client-project-submission .compensation .d-flex .bv-no-focus-ring {
    display: flex;
    align-items: center;
  }
  .billing-invoice .custom-control-label {
    font-weight: bold !important;
    margin-left: 15px !important;
  }
  .table th, .table td {
    padding: 0.75em 0em !important;
  }
  /* Bigger arraw icon on the dropbox and make it centered css */
  .dropdown-toggle::after {
    margin-top: 0.2em !important;
  }
  .client-project-submission .dropdown-menu.show{
    width: 200px !important;
  }
  /* Define Check box label font-weight  For now just for a ClientManagerCreateProject Component*/
  .custom-control-label {
    font-weight: 100 !important;
  }
  .dash-company-office .custom-select {
    font-weight: 600 !important;
    border: 1px solid #ffffff;
    background: #fff url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='5'%3E%3Cpath fill='%23343a40' d='M2  -1h4zm0 5L0 1h4z'/%3E%3C/svg%3E") no-repeat right 0.75rem center/8px 10px;
    max-width: 140px !important;
  }
  .project-detail .dropdown .btn-secondary {
    background-color: #061831 !important;
  }
  .superDash .budget .dropdown-menu {
    min-width: 22em;
  }
  .vue-notification .error {
    color: white !important;   
  }
  .accordion>.card {
    overflow: visible !important;
  }
  .idle-p {
    display: none;
  }
  #nprogress .spinner {
    top: 50%;
    left: 50%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    width: 20px;
  }
  .modal-header {
    height: 0px !important;
  }
  .modal-body {
    padding: 0px !important;
    border-bottom: 0px !important;
  }
  .modal-footer {
    padding: 0px !important;
  }

</style>
