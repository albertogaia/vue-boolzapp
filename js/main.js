Vue.config.devtools = true;

const app = new Vue({
    el: '#root',
    data: {
        activeChat: '',
        activeMessage: null,
        activeAvatar: '',
        lastActivity: '',
        lastTime: '',
        newMessage: '',
        search: '',
        myElement: 0,
        messagesRnd: [
            'Certo!', 'Ok', 'Ahahah 😂', 'Bellissima app, complimenti! 💪🏻','Come stai?', 'Non mi interessa 😁', 'Ehy amico vuoi una penna?', 'Vida locaaa 🎉', 'Stasera si beve 🔥'
        ],
        contacts: [
            {
                name: 'Michele',
                avatar: '_1',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Hai portato a spasso il cane?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Ricordati di dargli da mangiare',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 16:15:22',
                        message: 'Tutto fatto!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Fabio',
                avatar: '_2',
                visible: true,
                messages: [{
                    date: '20/03/2020 16:30:00',
                    message: 'Ciao come stai?',
                    status: 'sent'
                },
                    {
                        date: '20/03/2020 16:30:55',
                        message: 'Bene grazie! Stasera ci vediamo?',
                        status: 'received'
                    },
                    {
                        date: '20/03/2020 16:35:00',
                        message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Samuele',
                avatar: '_3',
                visible: true,
                messages: [{
                    date: '28/03/2020 10:10:40',
                    message: 'La Marianna va in campagna',
                    status: 'received'
                },
                    {
                        date: '28/03/2020 10:20:10',
                        message: 'Sicuro di non aver sbagliato chat?',
                        status: 'sent'
                    },
                    
                ],
            },
            {
                name: 'Luisa',
                avatar: '_6',
                visible: true,
                messages: [{
                    date: '10/01/2020 15:30:55',
                    message: 'Lo sai che ha aperto una nuova pizzeria?',
                    status: 'sent'
                },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Si, ma preferirei andare al cinema',
                        status: 'received'
                    },
                    {
                        date: '10/01/2020 15:53:00',
                        message: 'Ok come preferisci',
                        status: 'sent'
                    }
                ],
            },
        ]
    },
    methods: {
        lastMessage(e,i){
            let arrayMessage = this.filteredList[i].messages;

            return arrayMessage[parseInt(arrayMessage.length - 1)].message
        },
        lastSeen(e,i){
            let userLastActivity = this.filteredList[i].messages[parseInt(this.filteredList[i].messages.length - 1)].date;
            return this.lastTime = userLastActivity;
        },
        checkStatus(e,i){
            let statusMessage = this.filteredList[i].messages;

            return statusMessage[parseInt(statusMessage.length - 1)].status
        },
        getUserName(e,i){
            let userName = this.filteredList[i];
            this.activeChat = userName;

            let userAvatar = this.filteredList[i];
            this.activeAvatar = userAvatar;

            let userLastActivity = this.filteredList[i].messages[parseInt(this.contacts[i].messages.length - 1)].date;
            this.lastActivity = userLastActivity;
        },

        submitMessage(){

            let listMessages = this.activeChat.messages;

            let messageObject = {
                date: dayjs().hour() + ':' + dayjs().minute(),
                message: this.newMessage,
                status: 'sent',
            }

            if (this.newMessage != '') {
                listMessages.push(messageObject);
                this.newMessage = "";
            }

            setTimeout(this.updateScroll,100)
            setTimeout(()=>{
                let newMessageReceived = {
                    date: dayjs().hour() + ':' + dayjs().minute(),
                    message: this.messagesRnd[this.getRandomMsg(0,this.messagesRnd.length - 1)],
                    status: 'received'
                }
    
                listMessages.push(newMessageReceived);
                setTimeout(this.updateScroll,100)
            }, 1000);

        },

        updateScroll(){
            var element = document.getElementById("body-chat");
            element.scrollTop = element.scrollHeight - element.clientHeight + 100
            // console.log(element.scrollTop)
        },

        openMenu(index){
            if(this.activeMessage != index) {
                this.activeMessage = index
            }
            else {
                this.activeMessage = null;  
            }
            // this.closeMenuOutside
        },


        deleteMessage(e,i){
            this.activeChat.messages.splice(i, 1);
            this.closeMenu();

        },

        getRandomMsg(min, max){
            return Math.floor(Math.random() * (max - min + 1) + min)
        },

        closeMenu(){
            this.activeMessage = null;
        },


        
    },

    mounted() {
        this.activeChat = this.filteredList[0],
        this.lastActivity = this.contacts[0].messages[parseInt(this.contacts[0].messages.length - 1)].date
    },

    computed: {
        filteredList() {
          return this.contacts.filter(contact => {
            return contact.name.toLowerCase().includes(this.search.toLowerCase())
          })
        },
        
        closeMenuOutside(){
            let body = document.getElementById('body-chat')
            console.log(body)
            let activeMESSAGE = this.activeMessage

            document.addEventListener('click', function(event) {
                console.log(event.target)
                

                if(event.target == body || isNaN(activeMESSAGE) == false){
                    console.log(activeMESSAGE)
                    activeMESSAGE = null
                    this.activeMessage = activeMESSAGE
                    console.log(this.activeMessage)
                }
            });
        },  
    },

})

