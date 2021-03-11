(function(window) {
    // 'use strict';
    const STORAGE_KEY = 'items-vuejs'
        //进行本地存储获取
    const itemStorage = {
        //获取数据
        fetch: function() {
            //获取出来的是json字符串，通过parse将字符串转换成数组对象
            return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
        },
        //保留数据
        save: function(items) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
        }
    }
    const items = [{
        id: 1,
        content: 'java',
        completed: true
    }, {
        id: 2,
        content: 'c++',
        completed: false
    }, {
        id: 3,
        content: 'vue',
        completed: true
    }]
    var vm = new Vue({
        el: '#todoapp',
        data: {
            items: itemStorage.fetch(), //等同于items：items
            currentItem: null,
            filterStatus: 'all'
        },
        //定义监听器
        watch: {
            //深度监听，当对象中属性发生变化
            items: {
                deep: true, //深度监控对象中属性的变化
                handler: function(newItems, oldItem) {
                    //将数据保存在本地
                    itemStorage.save(newItems)
                }
            }

        },
        //定义计算属性
        computed: {
            toggleAll: {
                get() {
                    return this.remaining === 0
                },
                set(newStatus) {
                    this.items.forEach(item => {
                        item.completed = newStatus
                    });
                }
            },
            remaining() {
                // console.log(this.items.filter(item => !item.completed).length);
                // const unItems = this.items.filter(function(item) {
                //         console.log(!item.completed);
                //         return !item.completed
                //     })
                return this.items.filter(item => !item.completed).length
            },
            filterItem() {
                switch (this.filterStatus) {
                    case 'active':
                        return this.items.filter(item => !item.completed)
                        break;
                    case 'completed':
                        return this.items.filter(item => item.completed)
                        break;
                    default:
                        return this.items
                        break;
                }
            }
        },
        //定义函数	
        methods: {
            finishEdit(item, event) {
                const content = event.target.value.trim();
                if (!content) {
                    this.removeItem(item.id - 1)
                } else {
                    // console.log(item.content);
                    // console.log(content);
                    item.content = content;
                    this.currentItem = null;
                }
            },
            cancelEdit() {
                this.currentItem = null;
            },
            toEdit(item) {
                console.log(item);
                this.currentItem = item
            },
            removeCompleted() {
                this.items = this.items.filter((item) => !item.completed)
            },
            removeItem(index) {
                this.items.splice(index, 1)
            },
            addItem(event) {
                const content = event.target.value;
                if (!content.length) return false;
                const id = this.items.length + 1;
                this.items.push({
                    id,
                    content,
                    completed: false
                });
                event.target.value = '';
            }
        },
    })
    Vue.directive('focus', {
            update(el, binding) {
                el.focus()
            },
            insert(el, binding) {
                if (binding.value) {
                    el.focus()
                }
            }
        }),
        window.onhashchange = () => {
            const hash = window.location.hash.substr(2) || 'all'
            vm.filterStatus = hash
        };
    window.onhashchange();
})(window);