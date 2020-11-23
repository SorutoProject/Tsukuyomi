const messages = {
    en: {
        app: {
            name: "TSUKUYOMI",
            description: "How many days do I have?"
        },
        menu: {
            home: "HOME",
            newEvent: "New"
        },
        card: {
            dayleft: {
                before: "",
                after: "d. left"
            },
            removeConfirm: {
                title: "Confirm",
                confirmText: "Remove now?",
                buttons: {
                    cancel: "Cancel",
                    remove: "Remove"
                }
            },
            removedText: "Removed.",
            addText: "Add to TSUKUYOMI"
        },
        index: {
            newEvent: "New",
            eventListText: "Events List",
            noEventsFoundText: "No Events."
        },
        embed: {
            notInFrameText: "This page is only available in iframe."
        },
        new: {
            newEventText: "New",
            titleTextBox: {
                label: "Title",
                placeholder: "Ex) The School Festival"
            },
            startDateText: "Start in:",
            submitText: "Next"
        },
        addConfirm: {
            add: {
                title: "Confirm",
                confirmText: "Add this event to your events list.",
                cautionText: "If you are seeing this page through the link in external site, This event was created by others.<br>Save this event on your own responsibility.",
                buttons: {
                    cancel: "cancel",
                    submit: "save"
                }
            },
            share:{
                title:"Share",
                confirmText:"Add this event to your events list.",
                cautionText:"This event was created by others.<br>Save this event on your own responsibility.",
                buttons:{
                    cancel:"cancel",
                    submit:"save"
                }
            }
        },
        share:{
            title:"Share",
            subtext:"Share this event now",
            shareWithText:"Share with",
            urlCopied:"Copied URL to share",
            embedHtmlCopied:"Copied HTML to embed this event",
            or:"OR",
            shareWithGCal:"Add to Google Calendar",
            errorText:"Error",
            errorSubtext:"Requested event was not found."
        }

    },
    ja: {
        app: {
            name: "TSUKUYOMI",
            description: "「あと何日？」に特化したアプリ",
        },
        menu: {
            home: "ホーム",
            newEvent: "新しいイベントを作成"
        },
        card: {
            dayleft: {
                before: "あと",
                after: "日"
            },
            removeConfirm: {
                title: "削除確認",
                confirmText: "削除しますか？",
                buttons: {
                    cancel: "キャンセル",
                    remove: "Save"
                }
            },
            removedText: "削除しました",
            addText: "TSUKUYOMIに追加"
        },
        index: {
            newEvent: "新しいイベントを作成",
            eventListText: "イベントリスト",
            noEventsFoundText: "イベントは登録されていません"
        },
        embed: {
            notInFrameText: "このページはiframe内でのみ有効です。"
        },
        new: {
            newEventText: "新しいイベントを作成",
            titleTextBox: {
                label: "イベントの名称",
                placeholder: "例：文化祭"
            },
            startDateText: "イベント開始日",
            submitText: "イベントを作成"
        },
        addConfirm: {
            add: {
                title: "イベントの作成確認",
                confirmText: "次のイベントを作成しますか？",
                cautionText: "このページが外部サイトのリンクなどから表示された場合、このイベントは、他のユーザーが作成したものです。<br>このイベントを追加することによる損害などについて、開発者は一切の責任を負いません。",
                buttons: {
                    cancel: "キャンセル",
                    submit: "作成"
                }
            },
            share:{
                title:"イベントの共有",
                confirmText:"次の共有されたイベントをイベントリストに追加しますか？",
                cautionText:"このイベントは、他のユーザーが作成したものです。<br>このイベントを追加することによる損害などについて、開発者は一切の責任を負いません。",
                buttons:{
                    cancel:"キャンセル",
                    submit:"追加"
                }
            }
        },
        share:{
            title:"イベントの共有",
            subtext:"このイベントを共有します",
            shareWithText:"共有方法",
            urlCopied:"URLをコピーしました",
            embedHtmlCopied:"埋め込み用",
            or:"もしくは",
            shareWithGCal:"Googleカレンダーに追加",
            errorText:"エラー",
            errorSubtext:"イベントが見つかりません"
        }
    }
}

//detect user language
let userLang = "";
let langSetting = navigator.language;
if (langSetting.indexOf("ja") > -1) {
    userLang = "ja";
} else {
    userLang = "en";
}