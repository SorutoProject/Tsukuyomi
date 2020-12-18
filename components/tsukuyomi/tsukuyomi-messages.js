const messages = {
    en: {
        app: {
            name: "TSUKUYOMI",
            description: "How many days do I have?",
        },
        menu: {
            home: "Home",
            newEvent: "New",
            timeline: "Timeline",
            about: "About",
            shareMultiple: "Share Multiple",
            past: "Past Events",
            pwaInstall: "Install TSUKUYOMI",
            manage: "Manage Your Data",
            calendar: "Calendar"
        },
        bottomNav: {
            newEvent: "New",
            home: "Home",
            timeline: "Timeline",
            calendar: "Calendar"
        },
        card: {
            dayleft: {
                before: "",
                after: " d. left"
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
            addText: "Add to TSUKUYOMI",
            checkText: "Select",
            today: "Today",
            passed: {
                before: "",
                after: "d. ago"
            }
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
            title: "New",
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
                existText:"The title has already been used. It'll be overwritten if you continue.",
                buttons: {
                    cancel: "cancel",
                    submit: "save"
                }
            },
            share: {
                title: "Share",
                confirmText: "Add this event to your events list.",
                cautionText: "This event was created by others.<br>Save this event on your own responsibility.",
                existText:"The title has already been used. It'll be overwritten if you continue.",
                invalidDateTitle: "Invalid Date",
                invalidDateText: "You received an event with invalid date.",
                buttons: {
                    cancel: "cancel",
                    submit: "save"
                }
            },
            shareMultiple: {
                title: "Share Events",
                confirmText: "Add these events to your events list.",
                cautionText: "These events were created by others.<br>Save them on your own responsibility.",
                buttons: {
                    cancel: "cancel",
                    submit: "save"
                }
            }
        },
        share: {
            title: "Share",
            subtext: "Share this event now",
            shareWithText: "Share with",
            urlCopied: "Copied Sharing URL",
            embedHtmlCopied: "Copied HTML to embed this event",
            or: "OR",
            shareWithGCal: "Add to Google Calendar",
            errorText: "Error",
            errorSubtext: "Requested event was not found."
        },
        shareMultiple: {
            title: "Share Multiple",
            noEventsFoundText: "No Events.",
            urlCopied: "Copied Sharing URL",
            noSelected: "Select at least one event.",
            buttons: {
                share: "Share",
                selectAll: "Select All",
                deselect: "Deselect"
            }
        },
        timeline: {
            title: "Timeline",
            today: "Today",
            days: " d.",
            noEventsFoundText: "No Events."
        },
        past: {
            title: "Past Events",
            noEventsFoundText: "No Past Events."
        },
        manage: {
            title: "Manage Your Data",
            message: "Let's take a backup in case of data loss.",
            buttons: {
                import: "Import",
                export: "Export"
            }
        },
        calendar: {
            title: "Calendar",
            cardDialog:{
                title:"Details"
            }
        }

    },
    ja: {
        app: {
            name: "TSUKUYOMI",
            description: "「あと何日？」に特化したアプリ",
        },
        menu: {
            home: "ホーム",
            newEvent: "新しいイベントを作成",
            timeline: "タイムライン",
            about: "このアプリについて",
            shareMultiple: "まとめて共有",
            past: "過去のイベント",
            pwaInstall: "アプリをインストール",
            manage: "データ管理",
            calendar: "カレンダー"
        },
        bottomNav: {
            newEvent: "新規作成",
            home: "ホーム",
            timeline: "タイムライン",
            calendar: "カレンダー"
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
                    remove: "削除"
                }
            },
            removedText: "削除しました",
            addText: "TSUKUYOMIに追加",
            checkText: "選択",
            today: "今日",
            passed: {
                before:"",
                after:"日前"
            }
        },
        index: {
            newEvent: "新しいイベントを作成",
            eventListText: "イベントリスト",
            noEventsFoundText: "イベントはありません"
        },
        embed: {
            notInFrameText: "このページはiframe内でのみ有効です。"
        },
        new: {
            title: "新しいイベントを作成",
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
                existText:"すでに同じタイトルのイベントが存在しています。続行すると上書きされます。",
                buttons: {
                    cancel: "キャンセル",
                    submit: "作成"
                }
            },
            share: {
                title: "イベントの共有",
                confirmText: "次の共有されたイベントをイベントリストに追加しますか？",
                cautionText: "このイベントは、他のユーザーが作成したものです。<br>このイベントを追加することによる損害などについて、開発者は一切の責任を負いません。",
                existText:"すでに同じタイトルのイベントが存在しています。続行すると上書きされます。",
                invalidDateTitle: "無効な日付",
                invalidDateText: "無効な日付のイベントが共有されました。",
                buttons: {
                    cancel: "キャンセル",
                    submit: "追加"
                }
            },
            shareMultiple: {
                title: "まとめて共有",
                confirmText: "次の共有されたイベントをイベントリストに追加しますか？",
                cautionText: "これらのイベントは、他のユーザーが作成したものです。<br>イベントを追加することによる損害などについて、開発者は一切の責任を負いません。",
                buttons: {
                    cancel: "キャンセル",
                    submit: "追加"
                }
            }
        },
        share: {
            title: "イベントの共有",
            subtext: "このイベントを共有します",
            shareWithText: "共有方法",
            urlCopied: "URLをコピーしました",
            embedHtmlCopied: "埋め込み用HTMLをコピーしました",
            or: "もしくは",
            shareWithGCal: "Googleカレンダーに追加",
            errorText: "エラー",
            errorSubtext: "イベントが見つかりません"
        },
        shareMultiple: {
            title: "まとめて共有",
            noEventsFoundText: "イベントはありません",
            urlCopied: "URLをコピーしました",
            noSelected: "少なくとも1つ以上のイベントを選択してください",
            buttons: {
                share: "共有する",
                selectAll: "すべて選択",
                deselect: "選択解除"
            }
        },
        timeline: {
            title: "タイムライン",
            today: "今日",
            days: "日後",
            noEventsFoundText: "イベントはありません"
        },
        past: {
            title: "過去のイベント",
            noEventsFoundText: "過去のイベントはありません"
        },
        manage: {
            title: "データ管理",
            message: "データが消失したときのために、データのバックアップを取りましょう",
            buttons: {
                import: "インポート",
                export: "エクスポート"
            }
        },
        calendar: {
            title: "カレンダー",
            cardDialog:{
                title:"イベントの詳細"
            }
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
