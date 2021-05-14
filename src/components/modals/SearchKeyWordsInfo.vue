<template>
  <Dialog :visible.sync="showModal" :modal="true">
    <div>
      <span class="font-weight-bold">"транслітерація"</span> - автоматична перевірка слів в транслітерації UA <=> EN, RU <=> EN<br>
      <span class="font-weight-bold">"словесне написання цифр"</span> - автоматична перевірка цифр в їх словесному написанні і навпаки (крім UA)<br>
      <span class="font-weight-bold">"фонетична подібність"</span> - врахування фонетичної подібності звуків (б / п, f / ph і ін.), пропущених букв, пробілів<br>
      <span class="font-weight-bold">"використання спецсимволов"</span> - доступність використання символів: * - невизначена кількість невідомих літер і символів; ? - один невідомий символ або літера<br>
      <span class="font-weight-bold">"повнотекстовий пошук"</span> - пошук з урахуванням контексту і смислового значення
    </div>
  </Dialog>
</template>

<script>
    import Dialog from 'primevue/dialog';
    export default {
        name: "SearchKeyWordsInfo",
        props: {
            show: {
                type: Boolean,
                required: true,
                default: false
            },
        },
        computed: {
            showModal: {
                get: function () {
                    return this.show
                },
                set: function (newValue) {
                    this.$emit('update:show', newValue)
                }
            }
        },
        components: {Dialog}
    }
</script>
