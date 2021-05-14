<template>
  <Dialog :visible.sync="showModal" :modal="true">
    <div>
      <span class="font-weight-bold">"Ключові слова + класи"</span>- моніторинг тотожних і схожих позначень, поданих на
      реєстрацію.<br>
      Варіанти пошуку:
      <ul>
        <li>а) ключове слово + клас МКТП + клас МКЗЕ;</li>
        <li>б) клас МКТП + клас МКЗЕ;</li>
        <li>в) ключове слово + клас МКТП.</li>
      </ul>
      Перша перевірка по всьому масиву реєстрацій, кожна наступна - за останні три місяці.<br>
      <p class="mt-3"><span class="font-weight-bold">"Найменування заявника"</span> - усі заявки по заявнику / власнику, моніторинг змін
      в портфелі. Необхідно вказати заявника (самостійно або із запропонованих варіантів). Перша перевірка по всьому масиву
        реєстрацій, кожна наступна - за поточний період.</p><br>
      <p class="mt-3"><span class="font-weight-bold">"Класи товарів і послуг"</span> - надсилати всі заявки по класу (моніторинг
      тенденцій, оцінка загальної ситуації). Необхідно обрати клас товарів або послуг. Перша перевірка здійснюється за
      попередній місяць, кожен наступна - за поточний період.</p>
    </div>
  </Dialog>
</template>

<script>
    import Dialog from 'primevue/dialog';
    export default {
        name: "SearchCriteriaInfo",
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
