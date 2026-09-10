/* SHIFT NOTE application logic. Classic JavaScript: no build or module loader required. */
'use strict';
(() => {
  const $ = id => document.getElementById(id);
  // UI language is a device preference, separate from the work database and backups.
  const LANGUAGE_KEY = 'shift-note-language';
  const supportedLanguage = value => value === 'en' ? 'en' : 'ja';
  let language = 'ja';
  try { language = supportedLanguage(localStorage.getItem(LANGUAGE_KEY)); } catch { /* Use Japanese until the user selects a language. */ }
  const locale = () => language === 'en' ? 'en-US' : 'ja-JP';
  const EN = {
  "共有できませんでした。「.icsを保存」または「別画面で開く」をお試しください。": "Sharing failed. Try “Save .ics” or “Open in new tab”.",
  "共有を終了しました。ファイルの保存は引き続き選べます。": "Sharing was closed. You can still save the file.",
  "共有画面で選んだ保存先をご確認ください。": "Check the destination you selected in the share menu.",
  "この端末では共有を利用できません。「.icsを保存」をお使いください。": "Sharing is unavailable on this device. Use “Save .ics”.",
  "開いた画面の共有メニューなどから、ファイルの保存やカレンダーへの取り込みを選択してください。": "Use the share menu in the opened page to save the file or import it into your calendar.",
  "保存先やダウンロード一覧をご確認ください。始まらない場合は「別画面で開く」もお試しください。": "Check your downloads or chosen destination. If nothing happens, try “Open in new tab”.",
  "カレンダーファイルを準備できませんでした。もう一度お試しください。": "Could not prepare the calendar file. Please try again.",
  "{0}件のシフトを準備しました。日本時間の予定として取り込めます。": "Prepared {0} shift(s). They will be imported in Japan Standard Time.",
  "出力するシフトがありません。": "There are no shifts to export.",
  "シフト・設定・表示言語が変更されています。「最新の内容に更新」を押してから保存してください。": "Shifts, settings, or the display language have changed. Select “Refresh file” before saving.",
  "予定": "Planned",
  "確定": "Confirmed",
  "（翌日）": " (next day)",
  "勤務日 {0}\n{1}〜{2}{3}\n休憩 {4}分（うち深夜 {5}分）\n給与 {6} / 交通費 {7}\n{8}": "Work date: {0}\n{1}–{2}{3}\nBreak: {4} min (late night: {5} min)\nPay: {6} / Travel: {7}\n{8}",
  "シフト：": "Shift: ",
  "保存できませんでした。シフトは削除していません。画面上部の案内をご確認ください。": "Could not save. The shift has not been deleted. See the notice at the top of the page.",
  "シフトを削除しました。給与集計と履歴も更新しています。": "Shift deleted. Pay totals and history have also been updated.",
  "このシフトはすでに削除されています。": "This shift has already been deleted.",
  "削除の確認中にこのシフトが更新されました。新しい内容を確認して、もう一度削除してください。": "This shift changed while you were confirming deletion. Review the updated details and try again.",
  "この日にシフトはありません。": "No shifts on this day.",
  "削除": "Delete",
  "{0}のシフトを削除": "Delete shift: {0}",
  "編集": "Edit",
  "給与 {0} ／ 休憩 {1}分": "Pay {0} / Break {1} min",
  "前日 ": "Previous day ",
  "登録": "Add",
  "{0} の勤務": "Shifts on {0}",
  "土": "Sat",
  "金": "Fri",
  "木": "Thu",
  "水": "Wed",
  "火": "Tue",
  "月": "Mon",
  "日": "Sun",
  "他{0}件": "+{0} more",
  "シフトなし": "No shifts",
  "{0}件の勤務": "{0} shift(s)",
  "勤務がある日 {0}日 ／ シフトなし {1}日 ／ 月内の最大連勤 {2}日": "Workdays: {0} / Days off: {1} / Longest work streak this month: {2} days",
  "保存できませんでした。入力内容は残しています。": "Could not save. Your entries are still on screen.",
  "控除設定を保存しました。": "Deduction settings saved.",
  " 別タブの変更も反映しています。": " Changes from another tab are also included.",
  "パターンを削除できませんでした。": "Could not delete the pattern.",
  "パターンを削除しました。登録済みシフトは残っています。": "Pattern deleted. Saved shifts have been kept.",
  "パターンを編集": "Edit pattern",
  "削除された勤務先": "Deleted workplace",
  "シフトパターンを保存しました。": "Shift pattern saved.",
  "この勤務先には同じ名前のパターンがあります。": "This workplace already has a pattern with the same name.",
  "勤務先が削除されています。選び直してください。": "This workplace has been deleted. Please select another one.",
  "別の操作でパターンが変更・削除されています。編集を開き直してください。": "This pattern was changed or deleted elsewhere. Reopen it to edit.",
  "パターンを追加": "Add pattern",
  "を入力しました。勤務日を確認して保存してください。": " applied. Check the work date before saving.",
  "勤務先が削除されています。パターンの勤務先を変更してください。": "This workplace has been deleted. Choose a different workplace for this pattern.",
  "まだパターンはありません。「勤務先・設定」から追加できます。": "No patterns yet. Add one in “Workplaces & settings”.",
  "休憩 {0}分": "Break {0} min",
  "勤務先を登録してからパターンを保存してください。": "Add a workplace before saving a pattern.",
  "パターン": "Pattern",
  "休憩 {0}分（うち深夜 {1}分）": "Break {0} min (late night: {1} min)",
  "期間を削除できませんでした。": "Could not delete the period.",
  "期間を削除しました。シフトは残っています。": "Period deleted. Shifts have been kept.",
  "期間を編集": "Edit period",
  "シフト表の期間を保存しました。": "Schedule period saved.",
  "別の操作で期間が変更・削除されています。編集を開き直してください。": "This period was changed or deleted elsewhere. Reopen it to edit.",
  "開始日を選択してください。": "Select a start date.",
  "期間を追加": "Add period",
  "保存した期間はダッシュボードから選べます。": "Saved periods can be selected on the dashboard.",
  "期間": "Period",
  "{0}件 ／ 概算手取り {1}": "{0} shift(s) / Est. take-home {1}",
  "給与見込み": "Estimated pay",
  "すべての勤務先": "All workplaces",
  "{0}を削除": "Delete {0}",
  "キャンセル": "Cancel",
  "削除する": "Delete",
  "削除しますか？": "Delete this item?",
  "{0}件 ／ 給与 {1} ／ 交通費 {2} ／ 概算手取り {3}": "{0} shift(s) / Pay {1} / Travel {2} / Est. take-home {3}",
  "勤務先・設定の「概算手取りシミュレーション」で控除率を保存すると表示します。": "Save your deduction rates in “Take-home pay estimate” under “Workplaces & settings” to see this amount.",
  " ／ 端数調整 +": " / Rounding adjustment +",
  "所得税等 {0} ／ 社会保険料 {1} ／ その他 {2}{3}（設定率による概算）": "Income tax etc. {0} / Social insurance {1} / Other {2}{3} (estimated using your rates)",
  "未設定": "Not set",
  "{0} 〜 {1}（両端を含む） ／ {2} ／ 勤務開始日で集計": "{0} – {1} (inclusive) / {2} / Grouped by shift start date",
  "月ごと": "By month",
  "勤務先を選択": "Select a workplace",
  "控除率の合計は100%以内にしてください。": "Total deduction rates must not exceed 100%.",
  "各控除率を0〜100%、小数第2位までで入力してください。": "Enter each deduction rate from 0 to 100%, with up to two decimal places.",
  "集計する勤務先を選択してください。": "Select the workplace to include.",
  "正しい開始日・終了日を選択してください。終了日は開始日以降にしてください。": "Select valid start and end dates. The end date must be on or after the start date.",
  "期間の名前を1〜60文字で入力してください。": "Enter a period name between 1 and 60 characters.",
  "パターンの時刻と休憩を確認してください。": "Check the pattern’s start time, end time, and breaks.",
  "パターン名と勤務先を指定してください。": "Enter a pattern name and select a workplace.",
  "。勤務時間を確認してください。": ". Please check the working hours.",
  " ほか{0}件": " and {0} more",
  "他のシフトと時間帯が重複しています。": "This time overlaps with another shift: ",
  "予定を含む控除前の概算。設定した土日給・深夜時給を反映します。法定の残業・休日割増は別計算です。給与は控除前の概算です。": "Estimates before deductions, including planned shifts. Your weekend and late-night rates are included. Statutory overtime and holiday premiums must be calculated separately.",
  "給与合計：{0} ／ 交通費合計：{1}": "Total pay: {0} / Total travel: {1}",
  "出力日：{0}": "Export date: {0}",
  "SHIFT NOTE — シフト・給与一覧": "SHIFT NOTE — Shifts & pay report",
  "復旧内容を保存できませんでした。元データは保持しています。": "Could not save the recovered data. The originals have been kept.",
  "正常なデータで保存を再開しました。元データも保持しています。": "Saving has resumed using readable data. The originals have also been kept.",
  "空き容量や保存設定をご確認ください。": "Check available space and your storage settings.",
  "取り込めませんでした。保存中のデータは変更していません。": "Import failed. Your saved data has not been changed. ",
  "勤務先 {0}件・シフト {1}件を取り込みました。": "Imported {0} workplace(s) and {1} shift(s).",
  "バックアップからシフト {0}件を復元しました。": "Restored {0} shift(s) from the backup.",
  "バックアップを読み込めませんでした。": "Could not read the backup.",
  "勤務先 {0}件・シフト {1}件": "{0} workplace(s) / {1} shift(s)",
  "ファイルを読み込めませんでした。": "Could not read the file.",
  "空のファイルは読み込めません。50MB以下のJSONバックアップを選択してください。": "Empty files cannot be imported. Select a JSON backup no larger than 50 MB.",
  "取り込み内容を確認できませんでした。": "Could not prepare the import preview.",
  "この内容を取り込む": "Import these records",
  "この内容で置き換える": "Replace with this backup",
  "勤務先 {0}件・シフト {1}件・パターン {2}件・期間 {3}件を追加します。登録済みのシフト {4}件は追加せず、現在の内容を優先します。既存の勤務先・パターン・期間・控除設定・目安金額は維持します。時間帯の重複を含む履歴も復元されます。": "Add {0} workplace(s), {1} shift(s), {2} pattern(s), and {3} period(s). Skip {4} shift(s) already saved, keeping the current records. Existing workplaces, patterns, periods, deduction settings, and income references are kept. Historical shifts with overlapping times are also restored.",
  "現在の勤務先 {0}件・シフト {1}件・パターン・期間・控除設定・目安金額を、バックアップの勤務先 {2}件・シフト {3}件・パターン {4}件・期間 {5}件・控除設定・目安金額に置き換えます。": "Replace your current {0} workplace(s), {1} shift(s), patterns, periods, deduction settings, and income references with the backup’s {2} workplace(s), {3} shift(s), {4} pattern(s), {5} period(s), deduction settings, and income references.",
  "保存記録の上限に達しました。": "The storage revision limit has been reached.",
  "保存データを復旧してから取り込んでください。": "Recover your saved data before importing.",
  "保存データの復旧が必要です。画面上部から復旧するか、「すべて置き換える」を選択してください。": "Your saved data needs recovery. Use the notice at the top of the page, or select “Replace all data”.",
  "取り込み方法を選択してください。": "Select an import method.",
  "バックアップの{0}か所を正しく読み込めないため、取り込みを中止しました。保存中のデータは変更していません。": "Import stopped because {0} part(s) of the backup could not be read correctly. Your saved data has not been changed.",
  "バックアップの保存記録が正しくありません。": "The backup’s storage records are invalid.",
  "バックアップに勤務データが見つかりませんでした。": "No work data was found in this backup.",
  "バックアップの形式が正しくありません。": "The backup format is invalid.",
  "このバックアップの形式には対応していません。": "This backup format is not supported.",
  "SHIFT NOTEのバックアップファイルではありません。": "This is not a SHIFT NOTE backup file.",
  "JSONファイルを読み込めませんでした。SHIFT NOTEのバックアップを選択してください。": "Could not read the JSON file. Select a SHIFT NOTE backup.",
  "確認中にデータが更新されました。取り込み内容を更新したので、もう一度確認してください。": "Data changed during your review. The import preview has been refreshed; please review it again.",
  "バックアップを書き出せませんでした。ブラウザの保存設定をご確認ください。": "Could not export the backup. Check your browser’s storage settings.",
  "元データのバックアップを書き出しました。": "Original data backup exported.",
  "状態": "Status",
  "交通費(円)": "Travel (JPY)",
  "給与(円)": "Pay (JPY)",
  "深夜時給(円)": "Late-night rate (JPY/h)",
  "時給(円)": "Hourly rate (JPY)",
  "深夜(h)": "Late-night hours (h)",
  "実働(h)": "Working hours (h)",
  "深夜休憩(分)": "Late-night break (min)",
  "休憩(分)": "Break (min)",
  "退勤": "End",
  "出勤": "Start",
  "勤務先": "Workplace",
  "勤務日": "Work date",
  "保存できませんでした。入力内容は残しています。画面上部の案内をご確認ください。": "Could not save. Your entries are still on screen. See the notice at the top of the page.",
  "年収の目安を保存しました。": "Annual income references saved.",
  "目安金額を1〜1,000,000,000円の整数で入力してください。": "Enter a whole-yen reference amount from ¥1 to ¥1,000,000,000.",
  "円": "JPY",
  "目安{0}の金額（円）": "Amount for reference {0} (JPY)",
  "目安 ": "Reference ",
  "カスタム目安": "Custom reference",
  "勤務先を保存しました。シフト登録で選択できます。": "Workplace saved. You can select it when adding a shift.",
  "同じ名前の勤務先があります。一覧の「編集」から変更してください。": "A workplace with this name already exists. Use “Edit” in the list to change it.",
  "この勤務先は別の操作で削除されています。入力をクリアして登録し直してください。": "This workplace was deleted elsewhere. Clear the form and add it again.",
  "保存できませんでした。勤務先は削除していません。画面上部の案内をご確認ください。": "Could not save. The workplace has not been deleted. See the notice at the top of the page.",
  "削除しました。保存データを更新しました。": "Deleted. Saved data has been updated.",
  "新しい勤務先": "New workplace",
  "勤務先を編集": "Edit workplace",
  "勤務先はまだ登録されていません。名前と時給を入力して保存してください。": "No workplaces yet. Enter a name and hourly rate to save one.",
  "交通費なし": "No travel allowance",
  " / 勤務": " / shift",
  "交通費 ": "Travel ",
  " / 深夜 ": " / Late night ",
  "通常と同じ": "Same as regular",
  "土日": "Weekends",
  "（自動）": " (automatic)",
  " / 時間": " / h",
  "深夜時給 {0}": "Late-night rate {0}",
  "保存できませんでした。データは削除・変更していません。画面上部の案内をご確認ください。": "Could not save. No records have been deleted or changed. See the notice at the top of the page.",
  "勤務実績を確定しました。": "Shift confirmed as completed.",
  "シフトを登録すると、ここで確認・確定できます。": "Add shifts to review and confirm them here.",
  "この月のシフトはありません": "No shifts for this month",
  "交通費 {0}": "Travel {0}",
  "休憩 {0}分・時給 {1}": "Break {0} min / Rate {1}",
  "実働 {0}h": "Worked {0}h",
  "{0}件": "{0} shift(s)",
  "全期間の .ics": "All dates: .ics",
  "この月の .ics": "Month: .ics",
  "全期間のCSV": "All dates: CSV",
  "この月のCSV": "Month: CSV",
  "実績確定": "Confirm completed",
  "このデータを削除しますか？": "Delete this record?",
  "{0}の削除確認": "Confirm deletion: {0}",
  "年収の目安は非表示です。設定から有効にできます。": "Annual income references are hidden. Enable them in settings.",
  "残り ": "Remaining ",
  "設定額に達しています": "Reference amount reached",
  "{0}の目安": "Reference: {0}",
  "勤務先を設定": "Set up workplaces",
  "バイト先の名前と時給を自由に入力できます。": "Enter your workplace name and hourly rate.",
  "勤務先を設定しましょう": "Set up a workplace",
  "1時間あたり": "per hour",
  "勤務先と時給を入力して、次のシフトを登録しましょう。": "Enter a workplace and hourly rate to add your next shift.",
  "これからのシフトはありません": "No upcoming shifts",
  "{0}年の確定給与 {1}": "Confirmed pay in {0}: {1}",
  "シフトを登録": "Add shift",
  "登録時の時給を読み込んでいます。日付を変えると、このシフトに保存した通常・土日給から再計算します。勤務先の標準設定は設定画面から変更できます。": "Using the rates saved with this shift. Changing its date recalculates pay using its saved regular and weekend rates. Change workplace defaults in settings.",
  "変更を保存": "Save changes",
  "このシフトは削除されています。": "This shift has been deleted.",
  "シフト登録": "Add shift",
  "このシフトを登録": "Save this shift",
  "{0}へ戻る": "Back to {0}",
  "{0}・{1} {2}〜{3} ／ 給与 {4}": "{0} / {1} {2}–{3} / Pay {4}",
  "シフトを保存しました": "Shift saved",
  "シフトの変更を保存しました": "Shift changes saved",
  "同じ名前の勤務先があります。勤務先を選び直してください。": "A workplace with this name already exists. Select the workplace again.",
  "選択した勤務先が削除されています。勤務先を選び直してください。": "The selected workplace has been deleted. Please select another one.",
  "編集中に別のタブで更新されました。入力を控え、編集をキャンセルして開き直してください。": "This shift changed in another tab while you were editing. Keep a copy of your entries, cancel editing, and reopen the shift.",
  "このシフトは別の操作で削除されています。編集をキャンセルして履歴を確認してください。": "This shift was deleted elsewhere. Cancel editing and check your history.",
  "勤務先・時給も一緒に保存します。": "The workplace and hourly rates will be saved too.",
  "勤務先設定も入力内容で更新します。": "These entries will also update the workplace settings.",
  "保存すると履歴・給与集計・カレンダー・今後の出力に反映します。": "Saving updates history, pay totals, the calendar, and future exports.",
  "勤務先・時給・勤務時間を入力してください": "Enter a workplace, hourly rate, and working hours",
  "{0} ／ 時給 {1}・深夜 {2}": "{0} / Hourly rate {1} / Late night {2}",
  "通常・土日それぞれの時給から勤務日で自動計算します。変更して登録すると勤務先設定も更新します。": "Regular or weekend rates are applied by the work date. Saving changed rates also updates the workplace settings.",
  "このシフトの入力内容を編集します。勤務先の標準設定は設定画面から変更できます。": "You are editing this shift. Change the workplace’s default settings on the settings page.",
  "選択した勤務先が削除されています。入力内容は残しています。勤務先を選び直してください。": "The selected workplace has been deleted. Your entries are still on screen. Please select another workplace.",
  "この勤務先は削除済みです。登録時の時給で、このシフトを編集できます。": "This workplace has been deleted. You can still edit this shift using its saved rates.",
  "削除された勤務先（選び直してください）": "Deleted workplace (select again)",
  "削除済み勤務先（登録時の設定）": "Deleted workplace (saved rates)",
  "勤務先を直接入力する": "Enter a workplace manually",
  "シフトを編集": "Edit shift",
  "勤務先・設定": "Workplaces & settings",
  "月間カレンダー": "Monthly calendar",
  "勤務履歴": "Work history",
  "ダッシュボード": "Dashboard",
  "入力内容を確認してください。": "Please check your entries. ",
  "保存できませんでした。入力内容は画面に残しています。空き容量やブラウザの保存設定をご確認ください。": "Could not save. Your entries are still on screen. Check available space and your browser’s storage settings.",
  "保存データの復旧が必要です。画面上部の案内をご確認ください。": "Your saved data needs recovery. See the notice at the top of the page.",
  "ブラウザの保存設定をご確認ください。": "Check your browser’s storage settings.",
  "保存データを読み込めませんでした。入力内容は画面に残しています。": "Could not load saved data. Your entries are still on screen. ",
  "保存データの{0}か所を読み込めませんでした。正常なデータを表示しています。元データを保護したまま、バックアップや復旧ができます。": "Could not read {0} part(s) of the saved data. Readable data is displayed. You can back up or recover the data while keeping the originals.",
  "このブラウザに保存": "Saved in this browser",
  "保存状況を確認してください": "Check storage status",
  "別のタブが保存領域を使用しています。そのタブを閉じると処理を再開します。": "Another tab is using the storage. Close it to continue.",
  "このブラウザでは保存機能を利用できません。ブラウザの保存設定をご確認ください。": "Saving is unavailable in this browser. Check your browser’s storage settings.",
  "保存データの管理情報を読み込めませんでした。バックアップを書き出してください。": "Could not read the storage metadata. Please export a backup.",
  "保存処理が中断されました。": "Saving was interrupted.",
  "勤務実績の状態が正しくありません。": "The shift’s completion status is invalid.",
  "深夜の休憩を0以上の整数（分）で入力してください。": "Enter late-night break minutes as a whole number of zero or more.",
  "休憩を0以上の整数（分）で入力してください。": "Enter break minutes as a whole number of zero or more.",
  "退勤時刻を分単位で選択してください。": "Select an end time to the nearest minute.",
  "出勤時刻を分単位で選択してください。": "Select a start time to the nearest minute.",
  "カレンダーから勤務日を選択してください。": "Select a work date from the calendar.",
  "有効なカラーを選択してください。": "Select a valid color.",
  "土日の深夜時給を使う場合は土日給も入力してください。": "Enter a weekend hourly rate to use a weekend late-night rate.",
  "土日の深夜時給は1〜1,000,000円、小数第2位までで入力してください。": "Enter a weekend late-night rate from ¥1 to ¥1,000,000, with up to two decimal places.",
  "土日給は1〜1,000,000円、小数第2位までで入力してください。": "Enter a weekend hourly rate from ¥1 to ¥1,000,000, with up to two decimal places.",
  "深夜時給を1〜1,000,000円、小数第2位までで入力するか、空欄にしてください。": "Enter a late-night rate from ¥1 to ¥1,000,000, with up to two decimal places, or leave it blank.",
  "交通費を0〜1,000,000円の整数で入力してください。": "Enter travel allowance as a whole-yen amount from ¥0 to ¥1,000,000.",
  "時給を1〜1,000,000円、小数第2位までで入力してください（例：1,200）。": "Enter an hourly rate from ¥1 to ¥1,000,000, with up to two decimal places (e.g. 1,200).",
  "勤務先名を1〜60文字で入力してください。": "Enter a workplace name between 1 and 60 characters.",
  "深夜時給は1〜1,000,000円、小数第2位までで入力してください。": "Enter a late-night rate from ¥1 to ¥1,000,000, with up to two decimal places.",
  "時給は1〜1,000,000円、小数第2位までで入力してください。": "Enter an hourly rate from ¥1 to ¥1,000,000, with up to two decimal places.",
  "深夜の休憩は、休憩全体と22〜翌5時の勤務に収まる時間を入力してください。": "Late-night break time must fit within both the total break and the hours worked between 22:00 and 05:00. The remaining break must fit within daytime hours.",
  "休憩時間は勤務時間より短い、0以上の分数で入力してください。": "Enter break minutes as a whole number of zero or more, shorter than the shift duration.",
  "出勤と退勤に異なる時間を入力してください。": "Enter different start and end times.",
  "勤務先、シフト、給与の目安をまとめて管理。PC・スマートフォン対応。": "Manage workplaces, shifts, and estimated pay together. Available on desktop and mobile.",
  "SHIFT NOTE — シフト・給与管理": "SHIFT NOTE — Shifts & pay",
  "本文へ移動": "Skip to main content",
  "メインメニュー": "Main navigation",
  "ホーム": "Home",
  "カレンダー": "Calendar",
  "設定": "Settings",
  "カレンダーファイルを保存": "Save calendar file",
  "カレンダー出力を閉じる": "Close calendar export",
  ".icsを保存": "Save .ics",
  "共有": "Share",
  "別画面で開く": "Open in new tab",
  "最新の内容に更新": "Refresh file",
  "保存が始まらない場合は「別画面で開く」から、端末の共有メニューで保存をお試しください。アプリ内プレビューの場合はSafari・Chromeなどのブラウザで開いてください。": "If saving does not start, select “Open in new tab” and try the device’s share menu. If you are viewing an in-app preview, open the app in a browser such as Safari or Chrome.",
  "元データをバックアップ": "Back up original data",
  "正常なデータで復旧": "Recover readable data",
  "読み込める勤務先・シフト・目安金額で保存を再開します。読み込めない元データも保持します。": "Resume saving with readable workplaces, shifts, and income references. Unreadable original data will also be kept.",
  "復旧する": "Recover",
  "履歴を確認": "View history",
  "給与を集計する期間": "Pay summary period",
  "対象月": "Month",
  "期間を設定": "Set up periods",
  "今日の給与見込み": "Today’s estimated pay",
  "給与": "Pay",
  "交通費": "Travel",
  "期間の確定給与": "Confirmed pay for period",
  "実績として確定した勤務": "Shifts confirmed as completed",
  "期間の給与見込み": "Estimated pay for period",
  "確定 ＋ 予定": "Confirmed + planned",
  "期間の支給額・概算手取り": "Gross & estimated take-home pay",
  "確定と予定を含む試算": "Includes confirmed and planned shifts",
  "控除を設定": "Set deductions",
  "控除前（交通費込み）": "Gross pay (incl. travel)",
  "概算控除額": "Estimated deductions",
  "概算手取り（交通費込み）": "Est. take-home (incl. travel)",
  "これからのシフト": "Upcoming shifts",
  "今日以降の勤務予定": "Planned shifts from today onwards",
  "履歴": "History",
  "設定した時給から給与を計算": "Pay calculated from your hourly rates",
  "年収の目安": "Annual income references",
  "交通費を除く確定給与の合計です。目安金額は設定で変更できます。": "Total confirmed pay, excluding travel. You can change the reference amounts in settings.",
  "期間の勤務時間": "Working hours for period",
  "予定を含む実働時間": "Working hours, including planned shifts",
  "深夜の勤務": "Late-night hours",
  "続けて登録": "Add another shift",
  "シフトパターン": "Shift patterns",
  "勤務日はそのまま、勤務先・時給・時間・休憩を入力します。": "Fill in workplace, rates, times, and breaks without changing the work date.",
  "パターンを管理": "Manage patterns",
  "勤務先と時給": "Workplace & rates",
  "登録済みの勤務先": "Saved workplace",
  "勤務先名": "Workplace name",
  "例：カフェ〇〇 渋谷店": "e.g. Riverside Cafe",
  "時給": "Hourly rate",
  "深夜時給": "Late-night rate",
  "22〜翌5時": "22:00–05:00",
  "自動": "Auto",
  "割増を含む1時間あたりの金額。空欄なら通常時給の1.25倍。": "Hourly amount including the premium. Leave blank to use 1.25× the regular hourly rate.",
  "土日給": "Weekend rate",
  "空欄なら通常時給。勤務開始日が土日のシフト全体に適用。": "Leave blank to use the regular rate. Applies to the entire shift when it starts on Saturday or Sunday.",
  "土日の深夜時給": "Weekend late-night rate",
  "土日給を設定した場合、空欄なら土日給の1.25倍。": "When a weekend rate is set, leave blank to use 1.25× that rate.",
  "1勤務あたり": "per shift",
  "勤務時間": "Working hours",
  "出勤時間": "Start time",
  "退勤時間": "End time",
  "休憩時間": "Break time",
  "分": "min",
  "うち深夜の休憩": "Late-night break",
  "時刻は端末標準の時刻選択から分単位で入力できます。退勤が出勤より前の場合は翌日として計算します。": "Use your device’s time picker to enter hours and minutes. An end time earlier than the start time is treated as the following day.",
  "勤務実績として確定する": "Confirm as completed",
  "勤務が終わっている場合にチェック": "Check this when the shift has finished",
  "このシフトの給与": "Pay for this shift",
  "実働時間": "Working hours",
  "うち深夜": "Late-night portion",
  "控除前の支給額": "Gross pay",
  "概算手取り": "Est. take-home",
  "編集をキャンセル": "Cancel editing",
  "計算について": "About the calculation",
  "通常時間の実働 × 時給 ＋ 深夜（22〜翌5時）の実働 × 深夜時給。深夜時給が空欄の場合は通常時給の1.25倍を使用します。時給は小数第2位まで設定できます。分単位で計算し、1勤務ごとに円単位で四捨五入します。設定した土日給・深夜時給を反映します。法定の残業・休日割増は別計算です。給与は控除前の概算です。休憩時間は実際の内訳を入力してください。": "Daytime hours worked × hourly rate + late-night hours worked (22:00–05:00) × late-night rate. If the late-night rate is blank, 1.25× the regular rate is used. Rates support up to two decimal places. Pay is calculated by the minute and rounded to the nearest yen per shift. Your weekend and late-night rates are included. Statutory overtime and holiday premiums must be calculated separately. Pay is estimated before deductions. Enter the actual breakdown of your breaks.",
  "表示する月": "Display month",
  "給与合計": "Total pay",
  "シフト数": "Shift count",
  "前の月": "Previous month",
  "前月": "Previous",
  "次の月": "Next month",
  "翌月": "Next",
  "今月": "This month",
  "月間の勤務日一覧": "Workdays in this month",
  "日付を選ぶと勤務の詳細・編集・削除・新規登録ができます。日をまたぐ勤務は翌日のマスにも表示します。": "Select a date to view, edit, delete, or add shifts. Overnight shifts also appear on the following day.",
  "Language / 言語": "Language",
  "表示言語を選択します。金額は日本円、カレンダー出力は日本時間です。": "Choose your display language. Amounts remain in Japanese yen and calendar exports use Japan Standard Time.",
  "表示言語": "Display language",
  "勤務先を管理": "Manage workplaces",
  "バイト先と時給を自由に設定": "Set workplace names and hourly rates",
  "勤務先を追加": "Add workplace",
  "名前と時給を入力して保存してください。": "Enter a name and hourly rate, then save.",
  "1勤務": "per shift",
  "勤務先のカラー": "Workplace color",
  "バッジ・履歴・カレンダーに反映": "Used for badges, history, and the calendar",
  "入力をクリア": "Clear form",
  "勤務先を保存": "Save workplace",
  "時給の変更は今後の登録に反映します。登録済みシフトの給与は変わりません。": "Rate changes apply to future registrations. Pay for saved shifts stays the same.",
  "シフト表の期間": "Schedule periods",
  "1か月・2週間など、集計したい期間を保存": "Save a period to summarize, such as one month or two weeks",
  "期間の名前": "Period name",
  "例：9月後半のシフト表": "e.g. Second half of September",
  "開始日": "Start date",
  "終了日（この日を含む）": "End date (inclusive)",
  "集計する勤務先": "Workplace to include",
  "開始日から2週間": "Two weeks from start",
  "開始日の月末まで": "Until end of start month",
  "勤務開始日で集計します。日をまたぐ勤務の給与は開始日にまとめます。": "Totals use the shift’s start date. Pay for an overnight shift is counted on its start date.",
  "期間を保存": "Save period",
  "勤務先ごとの早番・遅番をワンタップで入力": "Fill in early or late shifts for each workplace with one tap",
  "パターン名": "Pattern name",
  "例：早番": "e.g. Early shift",
  "休憩（分）": "Break (min)",
  "うち深夜の休憩（分）": "Late-night break (min)",
  "適用時に勤務先の最新時給・土日給・交通費を使い、「予定」として入力します。": "Uses the workplace’s current rates, weekend rates, and travel allowance. The shift is entered as planned.",
  "パターンを保存": "Save pattern",
  "概算手取りシミュレーション": "Take-home pay estimate",
  "給与明細などを参考に、自分の概算控除率を設定": "Set your estimated deduction rates using a payslip or other reference",
  "設定した控除率で手取りを表示する": "Show take-home pay using these deduction rates",
  "所得税などの概算率": "Estimated income tax rate",
  "社会保険料の概算率": "Estimated social insurance rate",
  "その他の控除率": "Other deduction rate",
  "控除設定を保存": "Save deductions",
  "各控除額＝表示対象の給与合計（交通費除く）×設定率。項目ごとに円単位で四捨五入し、給与＋交通費から差し引きます。実際の税額・社会保険料を算定する機能ではありません。住民税等も必要なら「その他」に含めて設定してください。": "Each deduction = displayed total pay (excluding travel) × your rate. Each item is rounded to the nearest yen and subtracted from pay plus travel. This does not calculate your actual taxes or social insurance contributions. Include resident tax or other deductions under “Other” if needed.",
  "税額は適用する年や条件で異なります。": "Taxes vary by year and circumstances.",
  "国税庁：令和8年分 源泉徴収税額表": "National Tax Agency: 2026 withholding tax tables (Japanese)",
  "表示する目安と金額を設定": "Choose which references and amounts to display",
  "目安金額を保存": "Save reference amounts",
  "今年の確定給与（交通費を除く）を集計します。初期金額は任意の目標例です。税制・社会保険の加入条件や扶養の判定には使えません。自分の管理目標に合わせて変更してください。": "Totals confirmed pay for this year, excluding travel. The default amounts are optional example targets. They cannot determine tax, social insurance, or dependent eligibility. Adjust them to your own tracking goals.",
  "データの保存・復元": "Save & restore data",
  "勤務履歴の出力とバックアップの取り込み": "Export work history and import backups",
  "PDF / 印刷": "PDF / Print",
  "全シフトをカレンダーへ出力（.ics）": "Export all shifts to calendar (.ics)",
  "バックアップとインポート": "Backup and import",
  "バックアップ": "Backup",
  "インポート": "Import",
  "PDFは印刷画面の「PDFに保存」を選択してください。復元するときは「インポート」からJSONバックアップを選びます。.ics出力を選ぶと、画面上部に「.icsを保存」が表示されます。共有に対応する端末では「共有」も選べます。日本時間の予定として書き出します。Google・Appleカレンダーのファイル読み込みで一括追加できます。再出力しても自動同期はされず、取り込み先によっては重複します。": "For a PDF, choose “Save as PDF” in the print dialog. To restore data, select a JSON backup via “Import”. Calendar export opens a panel with “Save .ics” at the top of the page. Supported devices also offer “Share”. Events use Japan Standard Time. Import the file into Google or Apple Calendar to add all events. Re-exporting does not automatically sync events and may create duplicates in the destination calendar.",
  "インポートするJSONバックアップ": "JSON backup to import",
  "取り込むバックアップ": "Backup to import",
  "取り込み方法": "Import method",
  "現在のデータに追加する": "Add to current data",
  "すべて置き換える": "Replace all data",
  "このブラウザにデータを保存します。別のPC・スマホには自動同期されません。": "Data is saved in this browser. It does not automatically sync to other computers or phones.",
  "給与は控除前の概算です。": "Pay is estimated before deductions.",
  "通知を閉じる": "Close notification",
  "表示言語を保存しました。": "Display language saved.",
  "表示言語を切り替えましたが、保存できませんでした。再起動すると元の言語に戻る場合があります。": "Display language changed, but could not be saved. The previous language may return after reopening the app.",
  "保存データを読み込めませんでした。入力内容は画面に残しています。{0}": "Could not load saved data. Your entries are still on screen. {0}",
  "取り込めませんでした。保存中のデータは変更していません。{0}": "Import failed. Your saved data has not been changed. {0}",
  "{0} 別タブの変更も反映しています。": "{0} Changes from another tab are also included.",
  "他のシフトと時間帯が重複しています。{0}{1}。勤務時間を確認してください。": "This time overlaps with another shift: {0}{1}. Please check the working hours.",
  "{0}を入力しました。勤務日を確認して保存してください。": "{0} applied. Check the work date before saving.",
  "勤務先 {0}件・シフト {1}件{2}": "{0} workplace(s) / {1} shift(s){2}"
};
  const originalMessages = new Map(Object.entries(EN).map(([key, value]) => [value, key]));
  const messageOrigins = new Map();
  const activeFormErrors = new Map();
  function translate(key, ...values) {
    // Only application-owned messages are translated; user-entered names are parameters.
    const template = language === 'en' ? (EN[key] ?? key) : key;
    const rendered = template.replace(/\{(\d+)\}/g, (token, index) => index < values.length ? String(values[index]) : token);
    if (values.length) {
      messageOrigins.delete(rendered);
      messageOrigins.set(rendered, { key, values });
      if (messageOrigins.size > 1000) messageOrigins.delete(messageOrigins.keys().next().value);
    }
    return rendered;
  }
  function msg(parts, ...values) {
    return translate(parts.reduce((key, part, index) => key + (index ? '{' + (index - 1) + '}' : '') + part, ''), ...values);
  }
  function retranslate(message, nested = false, origins = messageOrigins) {
    const origin = origins.get(message);
    if (origin) return translate(origin.key, ...origin.values.map(value => nested && typeof value === 'string' ? retranslate(value, false, origins) : value));
    return translate(Object.hasOwn(EN, message) ? message : (originalMessages.get(message) ?? message));
  }
  function translateStaticUI() {
    document.documentElement.lang = language;
    document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = translate(el.dataset.i18n); });
    for (const attribute of ['aria-label', 'placeholder', 'title', 'content']) {
      document.querySelectorAll('[data-i18n-' + attribute + ']').forEach(el => {
        el.setAttribute(attribute, translate(el.getAttribute('data-i18n-' + attribute)));
      });
    }
  }
  const WORK_FIELDS = ['name','rate','nightRate','weekendRate','weekendNightRate','travel','color'];
  const STORAGE_KEY = 'shift-note-v1'; // Retain existing browser data from the original version.
  const icons = {
    mark:'<path d="m5 5 7 7-7 7m7-14 7 7-7 7"/>',
    dashboard:'<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
    register:'<path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7m-5-9 5 5-9 9-5 1 1-5ZM14 5l5 5"/>',
    share:'<path d="M12 16V3m-4 4 4-4 4 4M5 12v8h14v-8"/>',
    calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 11h18m-13 5h2m4 0h2"/>',
    history:'<path d="M3 11a9 9 0 1 1 2 7M3 4v7h7m2-5v6l4 2"/>',
    settings:'<polygon points="19.02148,9.09161 19.43392,10.41987 21.87688,10.43566 21.87688,13.56434 19.43392,13.58013 19.02148,14.90839 18.37390,16.13926 20.09017,17.87785 17.87785,20.09017 16.13926,18.37390 14.90839,19.02148 13.58013,19.43392 13.56434,21.87688 10.43566,21.87688 10.41987,19.43392 9.09161,19.02148 7.86074,18.37390 6.12215,20.09017 3.90983,17.87785 5.62610,16.13926 4.97852,14.90839 4.56608,13.58013 2.12312,13.56434 2.12312,10.43566 4.56608,10.41987 4.97852,9.09161 5.62610,7.86074 3.90983,6.12215 6.12215,3.90983 7.86074,5.62610 9.09161,4.97852 10.41987,4.56608 10.43566,2.12312 13.56434,2.12312 13.58013,4.56608 14.90839,4.97852 16.13926,5.62610 17.87785,3.90983 20.09017,6.12215 18.37390,7.86074"/><circle cx="12" cy="12" r="3"/>',
    plus:'<path d="M12 5v14M5 12h14"/>', close:'<path d="m6 6 12 12M6 18 18 6"/>',
    check:'<path d="m5 12 4 4L19 6"/>', checkCircle:'<circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/>',
    clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    wallet:'<path d="M20 8V5a2 2 0 0 0-2-2H6a3 3 0 0 0 0 6h14v12H6a3 3 0 0 1-3-3V6m17 7h-5v4h5"/>',
    briefcase:'<rect x="3" y="7" width="18" height="14" rx="2"/><path d="M8 7V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v3M3 12a22 22 0 0 0 18 0m-9 0v3"/>',
    trend:'<path d="m3 17 6-6 4 4 8-10m-6 0h6v6"/>',
    target:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
    info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v6m0-10h.01"/>', arrow:'<path d="M4 12h16m-6-6 6 6-6 6"/>',
    edit:'<path d="m16 3 5 5L8 21H3v-5ZM14 5l5 5"/>',
    trash:'<path d="M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7m4-7v7"/>',
    download:'<path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5"/>',
    file:'<path d="M14 2H5v20h14V7Zm0 0v5h5M8 12h8m-8 4h8"/>',
    printer:'<path d="M6 9V3h12v6M6 18H3V9h18v9h-3M6 14h12v8H6Zm11-2h.01"/>',
    monitor:'<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8m-4-4v4"/>'
  };
  const icon = name => `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">${icons[name] || icons.info}</svg>`;
  document.querySelectorAll('[data-icon]').forEach(el => { el.innerHTML = icon(el.dataset.icon); });
  const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const yen = n => '¥' + Math.round(n).toLocaleString(locale());
  const rateYen = n => '¥' + n.toLocaleString(locale(), { maximumFractionDigits: 4 });
  const decimal = n => Number(n.toFixed(2)).toLocaleString(locale());
  const sum = (rows, field) => rows.reduce((total, row) => total + row[field], 0);
  const today = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; };
  const uid = () => window.crypto?.randomUUID ? window.crypto.randomUUID() : Date.now().toString(36) + '-' + Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
  function normalize(value) { return String(value).normalize('NFKC').trim(); }
  function numberValue(value, fallback) {
    const raw = normalize(value).replace(/[,，\s¥￥円]/g,'');
    if (raw === '') return fallback === undefined ? NaN : fallback;
    return /^\d+(\.\d+)?$/.test(raw) ? Number(raw) : NaN;
  }
  function normalizeTime(value) {
    let t = normalize(value).replace(/：/g, ':');
    if (/^\d{3,4}$/.test(t)) t = t.slice(0,-2) + ':' + t.slice(-2);
    const match = /^(\d{1,2}):(\d{2})$/.exec(t);
    if (!match || +match[1] > 23 || +match[2] > 59) return null;
    return match[1].padStart(2,'0') + ':' + match[2];
  }
  function validDate(value) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value) || +value.slice(0,4)<1000 || +value.slice(0,4)>9998) return false;
    const d = new Date(value + 'T12:00:00');
    return Number.isFinite(d.getTime()) && d.getFullYear() === +value.slice(0,4) && d.getMonth()+1 === +value.slice(5,7) && d.getDate() === +value.slice(8,10);
  }
  // Domain validation is shared by forms and persisted records.
  class FieldError extends Error {
    constructor(field, message) { super(message); this.field = field; }
  }
  const validMoney = value => Number.isFinite(value) && value >= 1 && value <= 1000000 && /^\d+(?:\.\d{1,2})?$/.test(String(value));
  function cents(value) {
    const [whole, fraction = ''] = String(value).split('.');
    return BigInt(whole) * 100n + BigInt(fraction.padEnd(2, '0'));
  }
  function calculate(start, end, rest, nightRest, rate, nightRate = null) {
    const aText = normalizeTime(start), bText = normalizeTime(end);
    if (!aText) throw new FieldError('start', translate("出勤時刻を分単位で選択してください。"));
    if (!bText) throw new FieldError('end', translate("退勤時刻を分単位で選択してください。"));
    const toMinutes = t => +t.slice(0, 2) * 60 + +t.slice(3, 5);
    const a = toMinutes(aText); let b = toMinutes(bText);
    if (b < a) b += 1440;
    const span = b - a;
    if (!span) throw new FieldError('end', translate("出勤と退勤に異なる時間を入力してください。"));
    let night = 0;
    for (let t = a; t < b; t++) if (t % 1440 < 300 || t % 1440 >= 1320) night++;
    if (!Number.isInteger(rest) || rest < 0 || rest >= span) throw new FieldError('rest', translate("休憩時間は勤務時間より短い、0以上の分数で入力してください。"));
    if (!Number.isInteger(nightRest) || nightRest < 0 || nightRest > rest || nightRest > night || rest - nightRest > span - night) throw new FieldError('nightRest', translate("深夜の休憩は、休憩全体と22〜翌5時の勤務に収まる時間を入力してください。"));
    if (!validMoney(rate)) throw new FieldError('rate', translate("時給は1〜1,000,000円、小数第2位までで入力してください。"));
    if (nightRate !== null && !validMoney(nightRate)) throw new FieldError('nightRate', translate("深夜時給は1〜1,000,000円、小数第2位までで入力してください。"));
    const nightMinutes = night - nightRest, normalMinutes = span - rest - nightMinutes;
    // Quarter-cent units represent the automatic 5/4 premium exactly.
    // Keep both time and money integral until the final yen rounding.
    const rateUnits = cents(rate) * 4n;
    const nightUnits = nightRate === null ? cents(rate) * 5n : cents(nightRate) * 4n;
    const numerator = BigInt(normalMinutes) * rateUnits + BigInt(nightMinutes) * nightUnits;
    const pay = Number((numerator + 12000n) / 24000n);
    return { hours: (span - rest) / 60, nightHours: nightMinutes / 60, pay };
  }
  function validateWork(raw) {
    const errors = {}, name = normalize(raw.name ?? ''), rate = numberValue(raw.rate), travel = numberValue(raw.travel, 0);
    if (!name || name.length > 60) errors.name = translate("勤務先名を1〜60文字で入力してください。");
    const moneyTextOK = value => /^\d+(?:\.\d{1,2})?$/.test(normalize(value).replace(/[,，\s¥￥円]/g, ''));
    if (!validMoney(rate) || !moneyTextOK(raw.rate)) errors.rate = translate("時給を1〜1,000,000円、小数第2位までで入力してください（例：1,200）。");
    if (!Number.isInteger(travel) || travel < 0 || travel > 1000000) errors.travel = translate("交通費を0〜1,000,000円の整数で入力してください。");
    const nightRate = raw.nightRate == null || normalize(raw.nightRate) === '' ? null : numberValue(raw.nightRate);
    if (nightRate !== null && (!validMoney(nightRate) || !moneyTextOK(raw.nightRate))) errors.nightRate = translate("深夜時給を1〜1,000,000円、小数第2位までで入力するか、空欄にしてください。");
    const weekendRate = raw.weekendRate == null || normalize(raw.weekendRate) === '' ? null : numberValue(raw.weekendRate);
    const weekendNightRate = raw.weekendNightRate == null || normalize(raw.weekendNightRate) === '' ? null : numberValue(raw.weekendNightRate);
    if (weekendRate !== null && (!validMoney(weekendRate) || !moneyTextOK(raw.weekendRate))) errors.weekendRate = translate("土日給は1〜1,000,000円、小数第2位までで入力してください。");
    if (weekendNightRate !== null && (!validMoney(weekendNightRate) || !moneyTextOK(raw.weekendNightRate))) errors.weekendNightRate = translate("土日の深夜時給は1〜1,000,000円、小数第2位までで入力してください。");
    if (weekendNightRate !== null && weekendRate === null) errors.weekendRate = translate("土日の深夜時給を使う場合は土日給も入力してください。");
    const color = raw.color ?? '#bcf778';
    if (!/^#[0-9a-f]{6}$/i.test(color)) errors.color = translate("有効なカラーを選択してください。");
    return { errors, name, rate, nightRate, travel, weekendRate, weekendNightRate, color };
  }
  function validateShift(raw) {
    const w = validateWork(raw), errors = { ...w.errors };
    const start = normalizeTime(raw.start), end = normalizeTime(raw.end);
    const rest = numberValue(raw.rest, 0), nightRest = numberValue(raw.nightRest, 0);
    if (!validDate(raw.date)) errors.date = translate("カレンダーから勤務日を選択してください。");
    if (!start) errors.start = translate("出勤時刻を分単位で選択してください。");
    if (!end) errors.end = translate("退勤時刻を分単位で選択してください。");
    if (!Number.isInteger(rest) || rest < 0) errors.rest = translate("休憩を0以上の整数（分）で入力してください。");
    if (!Number.isInteger(nightRest) || nightRest < 0) errors.nightRest = translate("深夜の休憩を0以上の整数（分）で入力してください。");
    if (typeof raw.confirmed !== 'boolean') errors.confirmed = translate("勤務実績の状態が正しくありません。");
    let calc = null;
    if (!Object.keys(errors).length) {
      try { const r = ratesFor(w, raw.date); calc = calculate(start, end, rest, nightRest, r.rate, r.nightRate); }
      catch (error) { if (!(error instanceof FieldError)) throw error; errors[error.field] = error.message; }
    }
    return { errors, shift: { work: w.name, ...ratesFor(w, raw.date), baseRate: w.rate, baseNightRate: w.nightRate, weekendRate: w.weekendRate, weekendNightRate: w.weekendNightRate, color: w.color, travel: w.travel, date: raw.date, start, end, rest, nightRest, confirmed: raw.confirmed, ...(calc || {}) } };
  }
  const freshData = () => ({ works: [], shifts: [], patterns: [], periods: [], deductions: { enabled: false, tax: 0, social: 0, other: 0 }, limits: [{ amount: 1030000, on: true }, { amount: 1300000, on: true }, { amount: 1500000, on: false }] });
  const validId = id => typeof id === 'string' && id.length > 0 && id.length <= 200;
  const validLimit = l => l && Number.isInteger(l.amount) && l.amount >= 1 && l.amount <= 1000000000 && typeof l.on === 'boolean';
  function storedWork(raw) {
    if (!raw || !validId(raw.id) || typeof raw.name !== 'string' || typeof raw.rate !== 'number' || typeof raw.travel !== 'number' || (raw.nightRate != null && typeof raw.nightRate !== 'number')) throw new Error('invalid-work');
    const result = validateWork(raw);
    if (Object.keys(result.errors).length) throw new Error('invalid-work');
    for (const key of ['weekendRate','weekendNightRate']) if(raw[key] != null && typeof raw[key] !== 'number') throw new Error('invalid-work-rate');
    const { errors, ...fields } = result;
    return { id: raw.id, ...fields };
  }
  function storedShift(raw) {
    if (!raw || !validId(raw.id) || typeof raw.work !== 'string' || typeof raw.confirmed !== 'boolean' || typeof raw.start !== 'string' || typeof raw.end !== 'string' || (raw.workId != null && !validId(raw.workId)) || (raw.nightRate != null && typeof raw.nightRate !== 'number') || !['rate', 'travel', 'rest', 'nightRest', 'hours', 'nightHours', 'pay'].every(k => Number.isFinite(raw[k]) && raw[k] >= 0)) throw new Error('invalid-shift');
    for (const key of ['baseRate', 'baseNightRate', 'weekendRate', 'weekendNightRate']) if (raw[key] != null && typeof raw[key] !== 'number') throw new Error('invalid-rate-snapshot');
    const result = validateShift({ ...raw, name: raw.work, rate: raw.baseRate ?? raw.rate, nightRate: Object.hasOwn(raw, 'baseNightRate') ? raw.baseNightRate : raw.nightRate });
    if (Object.keys(result.errors).length) throw new Error('invalid-shift');
    // Derived totals are rebuilt from the original rate/time snapshot, fixing legacy rounding too.
    return { ...result.shift, id: raw.id, ...(raw.workId == null ? {} : { workId: raw.workId }), updatedAt: validStamp(raw.updatedAt) ? raw.updatedAt : null };
  }
  function decodeData(raw) {
    const result = freshData(); let issues = 0;
    if (!raw || typeof raw !== 'object') return { value: result, issues: 1 };
    for (const [field, decode] of [['works', storedWork], ['shifts', storedShift]]) {
      if (!Array.isArray(raw[field])) { issues++; continue; }
      const ids = new Set();
      for (const item of raw[field]) {
        try {
          const value = decode(item);
          if (ids.has(value.id)) throw new Error('duplicate-id');
          ids.add(value.id); result[field].push(value);
        } catch { issues++; }
      }
    }
    if (!Array.isArray(raw.limits) || !raw.limits.length || raw.limits.length > 20) issues++;
    else result.limits = raw.limits.map((l, i) => {
      if (validLimit(l)) return { amount: l.amount, on: l.on };
      issues++; return freshData().limits[i] || { amount: 1500000, on: false };
    });
    for (const [key, decode] of [['patterns', storedPattern], ['periods', storedPeriod]]) {
      if (raw[key] === undefined) continue; // v1–v3 backups have no new settings.
      if (!Array.isArray(raw[key])) { issues++; continue; }
      const ids = new Set();
      for (const item of raw[key]) { try { const v = decode(item); if (ids.has(v.id)) throw new Error('duplicate-id'); ids.add(v.id); result[key].push(v); } catch { issues++; } }
    }
    if (raw.deductions !== undefined) { try { result.deductions = storedDeductions(raw.deductions); } catch { issues++; } }
    return { value: result, issues };
  }

  // IndexedDB serializes read/validate/write across tabs, including file://.
  // Only current records are written. Normal edits never append a journal.
  const JOURNAL_PREFIX = 'shift-note-v2:op:';
  const DB_NAME = 'shift-note-v3';
  const STORE_NAMES = ['works', 'shifts', 'meta', 'archive'];
  let databasePromise, cachedStored = null, commitQueue = Promise.resolve();
  let data = freshData(), storageProblem = '', writingLocked = false, storageVersion = -1;
  let changeChannel = null;
  function modelOf(value) { return { works: new Map(value.works.map(w => [w.id, w])), shifts: new Map(value.shifts.map(s => [s.id, s])), limits: value.limits.map(l => ({ ...l })), patterns: value.patterns.map(p => ({...p})), periods: value.periods.map(p => ({...p})), deductions: {...value.deductions} }; }
  function valueOf(model) { return { works: [...model.works.values()], shifts: [...model.shifts.values()], limits: model.limits, patterns: model.patterns, periods: model.periods, deductions: model.deductions }; }
  function decodeOperation(op) {
    if (!op || typeof op !== 'object') throw new Error('invalid-operation');
    if (op.type === 'putWork' && ['create', 'update'].includes(op.mode) && Array.isArray(op.fields) && op.fields.every(key => WORK_FIELDS.includes(key))) return { type: op.type, mode: op.mode, fields: op.fields, value: storedWork(op.value) };
    if (['addShift', 'updateShift'].includes(op.type)) return { type: op.type, value: storedShift(op.value) };
    if (['removeWork', 'removeShift', 'confirmShift'].includes(op.type) && validId(op.id)) return { type: op.type, id: op.id };
    if (op.type === 'setLimit' && Number.isInteger(op.index) && op.index >= 0 && op.index < 20 && validLimit(op.value) && Array.isArray(op.fields) && op.fields.every(key => ['amount', 'on'].includes(key))) return { type: op.type, index: op.index, fields: op.fields, value: { amount: op.value.amount, on: op.value.on } };
    if (op.type === 'putPattern') return { type: op.type, value: storedPattern(op.value) };
    if (op.type === 'putPeriod') return { type: op.type, value: storedPeriod(op.value) };
    if (['removePattern', 'removePeriod'].includes(op.type) && validId(op.id)) return {type:op.type,id:op.id};
    if (op.type === 'setDeductions') return {type:op.type, value:storedDeductions(op.value)};
    throw new Error('invalid-operation');
  }
  function applyOperations(model, operations) {
    for (const op of operations) {
      if (op.type === 'putWork' && op.mode === 'create' && !model.works.has(op.value.id)) model.works.set(op.value.id, op.value);
      if (op.type === 'putWork' && op.mode === 'update' && model.works.has(op.value.id)) model.works.set(op.value.id, { ...model.works.get(op.value.id), ...Object.fromEntries(op.fields.map(key => [key, op.value[key]])) });
      if (op.type === 'addShift' && !model.shifts.has(op.value.id)) model.shifts.set(op.value.id, op.value);
      if (op.type === 'updateShift' && model.shifts.has(op.value.id)) model.shifts.set(op.value.id, op.value);
      if (op.type === 'putPattern') model.patterns = [...model.patterns.filter(p=>p.id!==op.value.id), op.value];
      if (op.type === 'putPeriod') model.periods = [...model.periods.filter(p=>p.id!==op.value.id), op.value];
      if (op.type === 'removePattern') model.patterns = model.patterns.filter(p=>p.id!==op.id);
      if (op.type === 'removePeriod') model.periods = model.periods.filter(p=>p.id!==op.id);
      if (op.type === 'setDeductions') model.deductions = op.value;
      if (op.type === 'removeWork') model.works.delete(op.id);
      if (op.type === 'removeShift') model.shifts.delete(op.id);
      if (op.type === 'confirmShift' && model.shifts.has(op.id)) model.shifts.set(op.id, { ...model.shifts.get(op.id), confirmed: true, updatedAt: new Date().toISOString() });
      if (op.type === 'setLimit' && model.limits[op.index]) model.limits[op.index] = { ...model.limits[op.index], ...Object.fromEntries(op.fields.map(key => [key, op.value[key]])) };
    }
  }
  function mergeDuplicateWorks(value) {
    const names = new Map(), aliases = new Map();
    for (const work of value.works) {
      const original = names.get(work.name);
      if (original) aliases.set(work.id, original.id);
      else names.set(work.name, work);
    }
    return {
      ...value, works: [...names.values()], patterns: value.patterns.map(p => aliases.has(p.workId) ? {...p,workId:aliases.get(p.workId)} : p), periods: value.periods.map(p => aliases.has(p.workId) ? {...p,workId:aliases.get(p.workId)} : p),
      // Each shift keeps its original name/rates/pay snapshot.
      shifts: value.shifts.map(s => aliases.has(s.workId) ? { ...s, workId: aliases.get(s.workId) } : s)
    };
  }
  function readLegacy() {
    const records = new Map(), rawBase = localStorage.getItem(STORAGE_KEY);
    if (rawBase !== null) records.set(STORAGE_KEY, rawBase);
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i); if (key?.startsWith(JOURNAL_PREFIX)) records.set(key, localStorage.getItem(key));
    }
    return decodeLegacyRecords(records);
  }
  function decodeLegacyRecords(records) {
    const rejected = [], keys = [...records.keys()].filter(key => key.startsWith(JOURNAL_PREFIX));
    const rawBase = records.get(STORAGE_KEY) ?? null;
    keys.sort();
    const entries = keys.map(key => {
      const raw = records.get(key), suffix = key.slice(JOURNAL_PREFIX.length);
      try {
        if (!/^\d{16}-[\w-]+$/.test(suffix)) throw new Error('invalid-key');
        const parsed = JSON.parse(raw), sequence = suffix.slice(0, 16);
        if (!parsed || parsed.version !== 2) throw new Error('invalid-version');
        if (parsed.snapshot) {
          const decoded = decodeData(parsed.snapshot);
          if (decoded.issues) throw new Error('invalid-snapshot');
          return { key, sequence, snapshot: decoded.value };
        }
        if (!Array.isArray(parsed.operations) || !parsed.operations.length || parsed.operations.length > 25) throw new Error('invalid-operations');
        return { key, sequence, operations: parsed.operations.map(decodeOperation) };
      } catch { rejected.push({ key, raw }); return { key, invalid: true }; }
    });
    const checkpoint = entries.filter(entry => entry.snapshot).pop();
    let initial = freshData(), issues = 0;
    if (checkpoint) initial = checkpoint.snapshot;
    else if (rawBase !== null) {
      try {
        const decoded = decodeData(JSON.parse(rawBase)); initial = decoded.value; issues += decoded.issues;
        if (decoded.issues) rejected.push({ key: STORAGE_KEY, raw: rawBase });
      } catch { issues++; rejected.push({ key: STORAGE_KEY, raw: rawBase }); }
    }
    const model = modelOf(initial);
    for (const entry of entries) {
      if (entry.invalid) { if (!checkpoint || entry.key > checkpoint.key) issues++; continue; }
      // Equal sequence numbers came from concurrent tabs. A snapshot cannot
      // already contain such an operation: do not discard it by UUID order.
      if (entry.operations && (!checkpoint || entry.sequence >= checkpoint.sequence)) applyOperations(model, entry.operations);
    }
    return { value: mergeDuplicateWorks(valueOf(model)), issues, rejected, records };
  }
  function transact(db, mode, setup, names = STORE_NAMES) {
    return new Promise((resolve, reject) => {
      const tx = db.transaction(names, mode); let result, failure;
      const fail = error => { failure = error; try { tx.abort(); } catch { reject(error); } };
      tx.oncomplete = () => resolve(result);
      tx.onabort = () => reject(failure || tx.error || new Error(translate("保存処理が中断されました。")));
      // Schedule writes in IDB request callbacks; never await unrelated work
      // inside an active transaction (including Safari's transaction lifetime).
      try { setup(tx, value => { result = value; }, fail); } catch (error) { fail(error); }
    });
  }
  function readTransactionRecords(tx, ready, fail) {
    const requests = [tx.objectStore('works').getAll(), tx.objectStore('shifts').getAll(), tx.objectStore('meta').get('state')];
    let pending = requests.length;
    requests.forEach(request => { request.onsuccess = () => {
      if (--pending === 0) {
        try { ready({ works: requests[0].result, shifts: requests[1].result, meta: requests[2].result }); }
        catch (error) { fail(error); }
      }
    }; });
  }
  function decodeStoredRecords(raw) {
    const meta = raw.meta;
    if (!meta || !Number.isSafeInteger(meta.revision) || meta.revision < 0) throw new Error(translate("保存データの管理情報を読み込めませんでした。バックアップを書き出してください。"));
    const decoded = decodeData({ works: raw.works, shifts: raw.shifts, limits: meta.limits, patterns: meta.patterns, periods: meta.periods, deductions: meta.deductions });
    return { value: decoded.value, issues: decoded.issues + (meta.issues || 0), version: meta.revision };
  }
  async function migrateLegacy(db) {
    const imported = await transact(db, 'readwrite', (tx, finish, fail) => {
      const request = tx.objectStore('meta').get('state');
      request.onsuccess = () => {
        try {
          if (request.result) {
            const pending = tx.objectStore('archive').get('migration-pending');
            pending.onsuccess = () => finish(pending.result?.records || null);
            return;
          }
          const legacy = readLegacy();
          legacy.value.works.forEach(w => tx.objectStore('works').add(w));
          legacy.value.shifts.forEach(s => tx.objectStore('shifts').add(s));
          if (legacy.rejected.length) tx.objectStore('archive').put({ id: 'legacy-invalid', records: legacy.rejected });
          const records = [...legacy.records];
          if (records.length) tx.objectStore('archive').put({ id: 'migration-pending', records });
          tx.objectStore('meta').put({ id: 'state', revision: 0, limits: legacy.value.limits, patterns: legacy.value.patterns, periods: legacy.value.periods, deductions: legacy.value.deductions, issues: legacy.issues });
          finish(records.length ? records : null);
        } catch (error) { fail(error); }
      };
    });
    // Cleanup only after durable transaction completion, and only bytes that
    // were actually imported. Never delete a value changed by another tab.
    if (imported) {
      let cleaned = true;
      for (const [key, raw] of imported) {
        try { if (localStorage.getItem(key) === raw) localStorage.removeItem(key); } catch { cleaned = false; }
      }
      if (cleaned) {
        try { await transact(db, 'readwrite', tx => tx.objectStore('archive').delete('migration-pending'), ['archive']); }
        catch { /* Retry cleanup on next open; the imported data is already safe. */ }
      }
    }
  }
  function openDatabase() {
    if (!databasePromise) databasePromise = new Promise((resolve, reject) => {
      if (!window.indexedDB) { reject(new Error(translate("このブラウザでは保存機能を利用できません。ブラウザの保存設定をご確認ください。"))); return; }
      // Schema 2 also prevents the older app (schema 1) from overwriting v4 metadata.
      const request = window.indexedDB.open(DB_NAME, 2);
      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains('works')) db.createObjectStore('works', { keyPath: 'id' }).createIndex('name', 'name', { unique: true });
        if (!db.objectStoreNames.contains('shifts')) db.createObjectStore('shifts', { keyPath: 'id' }).createIndex('date', 'date');
        if (!db.objectStoreNames.contains('meta')) db.createObjectStore('meta', { keyPath: 'id' });
        if (!db.objectStoreNames.contains('archive')) db.createObjectStore('archive', { keyPath: 'id' });
      };
      request.onerror = () => reject(request.error);
      request.onblocked = () => { storageProblem = translate("別のタブが保存領域を使用しています。そのタブを閉じると処理を再開します。"); updateStorageNotice(); };
      request.onsuccess = () => {
        const db = request.result;
        db.onversionchange = () => { db.close(); databasePromise = null; cachedStored = null; storageVersion = -1; };
        migrateLegacy(db).then(() => resolve(db), error => { db.close(); reject(error); });
      };
    }).catch(error => { databasePromise = null; throw error; });
    return databasePromise;
  }
  async function readStored(force = false) {
    const db = await openDatabase();
    return transact(db, 'readonly', (tx, finish, fail) => {
      const request = tx.objectStore('meta').get('state');
      request.onsuccess = () => {
        if (!force && cachedStored && request.result?.revision === cachedStored.version) { finish(cachedStored); return; }
        readTransactionRecords(tx, raw => finish(decodeStoredRecords(raw)), fail);
      };
    }, ['works', 'shifts', 'meta']);
  }
  function updateStorageNotice() {
    $('storageNotice').hidden = !storageProblem;
    $('storageMessage').textContent = storageProblem;
    $('storageRecovery').hidden = !writingLocked;
    $('storageLabel').textContent = storageProblem ? translate("保存状況を確認してください") : translate("このブラウザに保存");
  }
  function acceptStored(loaded) {
    if (loaded.version < storageVersion) return false;
    data = loaded.value; storageVersion = loaded.version; cachedStored = loaded; writingLocked = loaded.issues > 0;
    storageProblem = writingLocked ? msg`保存データの${loaded.issues}か所を読み込めませんでした。正常なデータを表示しています。元データを保護したまま、バックアップや復旧ができます。` : '';
    updateStorageNotice(); markIcsExportStale(); return true;
  }
  async function refreshStored(render = true) {
    refreshCalendar();
    try {
      const loaded = await readStored(), changed = loaded.version !== storageVersion;
      if (acceptStored(loaded) && changed && render) refreshViews();
      return true;
    } catch (error) {
      storageProblem = msg`保存データを読み込めませんでした。入力内容は画面に残しています。${error.message || translate("ブラウザの保存設定をご確認ください。")}`;
      updateStorageNotice(); return false;
    }
  }
  function writeChangedRecords(tx, model, operations) {
    const workIds = new Set(), shiftIds = new Set();
    for (const op of operations) {
      if (op.type === 'putWork') workIds.add(op.value.id);
      if (op.type === 'removeWork') workIds.add(op.id);
      if (['addShift', 'updateShift'].includes(op.type)) shiftIds.add(op.value.id);
      if (op.type === 'removeShift' || op.type === 'confirmShift') shiftIds.add(op.id);
    }
    for (const id of workIds) {
      if (model.works.has(id)) tx.objectStore('works').put(model.works.get(id));
      else tx.objectStore('works').delete(id);
    }
    for (const id of shiftIds) {
      if (model.shifts.has(id)) tx.objectStore('shifts').put(model.shifts.get(id));
      else tx.objectStore('shifts').delete(id);
    }
  }
  function commit(build, recover = false) {
    const execute = async () => {
      const db = await openDatabase();
      const outcome = await transact(db, 'readwrite', (tx, finish, fail) => {
        readTransactionRecords(tx, raw => {
          const loaded = decodeStoredRecords(raw);
          if (loaded.issues && !recover) { acceptStored(loaded); throw new Error(translate("保存データの復旧が必要です。画面上部の案内をご確認ください。")); }
          // A second, stale recovery confirmation is a no-op. It cannot reset
          // a database already recovered and edited by another tab.
          if (recover && !loaded.issues) { finish({ loaded, result: { persisted: true }, changed: false }); return; }
          const result = build(loaded.value);
          if (result.errors && Object.keys(result.errors).length) { finish({ loaded, result, changed: false }); return; }
          const operations = (result.operations || []).map(decodeOperation);
          if (!operations.length && !recover) { finish({ loaded, result: { ...result, persisted: true }, changed: false }); return; }
          if (loaded.version >= Number.MAX_SAFE_INTEGER) throw new Error(translate("保存記録の上限に達しました。"));
          const model = modelOf(recover ? mergeDuplicateWorks(loaded.value) : loaded.value);
          applyOperations(model, operations);
          if (recover) {
            // Retain undecodable originals for the existing backup feature.
            const invalid = { works: [], shifts: [], meta: null };
            for (const w of raw.works) { try { storedWork(w); } catch { invalid.works.push(w); } }
            for (const s of raw.shifts) { try { storedShift(s); } catch { invalid.shifts.push(s); } }
            if (decodeData({ works: [], shifts: [], ...raw.meta }).issues) invalid.meta = raw.meta;
            if (invalid.works.length || invalid.shifts.length || invalid.meta) tx.objectStore('archive').put({ id: 'repair-' + uid(), ...invalid });
            tx.objectStore('works').clear(); tx.objectStore('shifts').clear();
            model.works.forEach(w => tx.objectStore('works').put(w));
            model.shifts.forEach(s => tx.objectStore('shifts').put(s));
          } else writeChangedRecords(tx, model, operations);
          const version = loaded.version + 1;
          tx.objectStore('meta').put({ id: 'state', revision: version, limits: model.limits, patterns: model.patterns, periods: model.periods, deductions: model.deductions, issues: 0 });
          finish({ loaded: { value: valueOf(model), version, issues: 0 }, result: { ...result, persisted: true }, changed: true });
        }, fail);
      });
      acceptStored(outcome.loaded);
      if (outcome.changed) { try { changeChannel?.postMessage({ revision: outcome.loaded.version }); } catch { /* Focus/polling also refresh other tabs. */ } }
      return outcome.result;
    };
    const pending = commitQueue.then(execute);
    commitQueue = pending.catch(() => {});
    return pending.catch(error => {
      if (!writingLocked) storageProblem = translate("保存できませんでした。入力内容は画面に残しています。空き容量やブラウザの保存設定をご確認ください。");
      updateStorageNotice(); throw error;
    });
  }

  let pendingDeleteId = null, pendingWorkDeleteId = null;
  let page = 'dashboard', editingWorkId = null, formHasErrors = false, registering = false, toastTimer;
  const fieldIds={name:'shiftWorkName',rate:'shiftRate',nightRate:'shiftNightRate',travel:'shiftTravel',weekendRate:'shiftWeekendRate',weekendNightRate:'shiftWeekendNightRate',date:'shiftDate',start:'start',end:'end',rest:'breakMinutes',nightRest:'nightBreak'};
  const workFieldIds={name:'workName',rate:'workRate',nightRate:'workNightRate',travel:'workTravel',weekendRate:'workWeekendRate',weekendNightRate:'workWeekendNightRate',color:'workColor'};
  function displayErrors(errors, ids, bannerId, focusFirst=false) {
    activeFormErrors.set(bannerId, { errors: { ...errors }, ids });
    Object.entries(ids).forEach(([key,id])=>{
      const invalid = !!errors[key];
      $(id).setAttribute('aria-invalid',String(invalid));
      $('error-'+id).hidden = !invalid;
      $('error-'+id).textContent = errors[key] || '';
    });
    const banner=$(bannerId), first=Object.keys(errors)[0];
    banner.hidden=!first; banner.textContent=first?translate("入力内容を確認してください。")+errors[first]:'';
    if (first && focusFirst && ids[first]) $(ids[first]).focus();
  }
  function notify(message) { clearTimeout(toastTimer); $('toastMessage').textContent=message; $('toast').hidden=false; toastTimer=setTimeout(()=>$('toast').hidden=true,4500); }
  $('closeToast').addEventListener('click',()=>{ $('toast').hidden=true; });
  const pageText=()=>({dashboard:[translate("ダッシュボード"),'YOUR WORK, AT A GLANCE'],shift:[translate("シフト登録"),'MAKE TIME COUNT'],history:[translate("勤務履歴"),'YOUR WORK LOG'],calendar:[translate("月間カレンダー"),'YOUR MONTH, AT A GLANCE'],settings:[translate("勤務先・設定"),'YOUR WORKSPACE SETTINGS']});
  function showPage(next, focus=false) {
    if (!pageText()[next]) return;
    refreshCalendar(false);
    if (next === 'shift' && page !== 'shift') shiftReturnPage = page;
    page=next;
    pendingDeleteId=null;pendingWorkDeleteId=null;resetCalendarDeletion();
    document.querySelectorAll('.view').forEach(el=>{el.hidden=el.id!==next;});
    document.querySelectorAll('.nav-button').forEach(el=>{
      const active=el.dataset.page===next;
      el.classList.toggle('active',active);
      if(active)el.setAttribute('aria-current','page');else el.removeAttribute('aria-current');
    });
    $('pageTitle').textContent=next==='shift'&&editingShiftId?translate("シフトを編集"):pageText()[next][0]; $('pageEyebrow').textContent=pageText()[next][1];
    $('headerAdd').hidden=next==='shift';
    if(next==='dashboard')renderDashboard();
    if(next==='history')renderHistory();
    if(next==='calendar')renderMonthCalendar();
    if(next==='settings'){renderWorks();if(!limitsDirty)renderLimits();renderExtras();}
    if(next==='shift'){$('successNotice').hidden=true;syncWorkSelect();renderPatternChoices();renderEstimate();}
    if(focus)$('main').focus({preventScroll:true});
    window.scrollTo({top:0,behavior:'auto'});
  }
  document.addEventListener('click',event=>{
    const target=event.target.closest('[data-page]');
    if(target){event.preventDefault();showPage(target.dataset.page,true);}
  });
  function syncWorkSelect(selected = selectedWorkId || $('workplace').value) {
    selectedWorkId = selected || null;
    const missing = selected && !data.works.some(w => w.id === selected);
    $('workplace').innerHTML = ("<option value=\"\">" + translate("勤務先を直接入力する") + "</option>") +
      data.works.map(w => `<option value="${esc(w.id)}">${esc(w.name)} ／ ${rateYen(w.rate)}${translate(' / 時間')}</option>`).join('') +
      (missing ? `<option value="${esc(selected)}" disabled>${editingShiftId?translate("削除済み勤務先（登録時の設定）"):translate("削除された勤務先（選び直してください）")}</option>` : '');
    $('workplace').value = selected || '';
    if (missing) $('workHint').textContent = editingShiftId ? translate("この勤務先は削除済みです。登録時の時給で、このシフトを編集できます。") : translate("選択した勤務先が削除されています。入力内容は残しています。勤務先を選び直してください。");
  }
  function fillWorkFields(w) {
    $('shiftWorkName').value = w?.name || '';
    $('shiftRate').value = w?.rate ?? '';
    $('shiftNightRate').value = w?.nightRate ?? '';
    $('shiftWeekendRate').value = w?.weekendRate ?? '';
    $('shiftWeekendNightRate').value = w?.weekendNightRate ?? '';
    $('shiftTravel').value = w?.travel ?? 0;
  }
  function applyWorkSelection() {
    selectedWorkId = $('workplace').value || null;
    const w = data.works.find(w => w.id === selectedWorkId);
    if (selectedWorkId && !w) { renderEstimate(); return; }
    selectedWorkSnapshot = w ? {...w} : null;
    fillWorkFields(w);
    $('workHint').textContent = editingShiftId ? translate("このシフトの入力内容を編集します。勤務先の標準設定は設定画面から変更できます。") : translate("通常・土日それぞれの時給から勤務日で自動計算します。変更して登録すると勤務先設定も更新します。");
    renderEstimate();
  }
  function readShift() { return { name:$('shiftWorkName').value,rate:$('shiftRate').value,nightRate:$('shiftNightRate').value,weekendRate:$('shiftWeekendRate').value,weekendNightRate:$('shiftWeekendNightRate').value,color:selectedWorkSnapshot?.color ?? editingShiftSnapshot?.color ?? '#bcf778',travel:$('shiftTravel').value,date:$('shiftDate').value,start:$('start').value,end:$('end').value,rest:$('breakMinutes').value,nightRest:$('nightBreak').value,confirmed:$('isConfirmed').checked }; }
  function renderEstimate() {
    const result=validateShift(readShift());
    const missingWork = selectedWorkId && !data.works.some(w => w.id === selectedWorkId) && !(editingShiftSnapshot?.workId === selectedWorkId);
    if (missingWork) { result.errors.name = translate("選択した勤務先が削除されています。勤務先を選び直してください。"); formHasErrors = true; }
    if (formHasErrors) displayErrors(result.errors, fieldIds, 'shiftError');
    const valid=Object.keys(result.errors).length===0;
    const s=result.shift;
    $('estimatePay').textContent=valid?yen(s.pay):'—';
    $('estimateHours').textContent=valid?decimal(s.hours)+' h':'—';
    $('estimateNight').textContent=valid?decimal(s.nightHours)+' h':'—';
    $('estimateTravel').textContent=valid?yen(s.travel):'—';
    $('estimateTotal').textContent=valid?yen(s.pay+s.travel):'—';
    $('estimateWork').textContent=valid?msg`${s.work} ／ 時給 ${rateYen(s.rate)}・深夜 ${rateYen(s.nightRate ?? s.rate*1.25)}`:translate("勤務先・時給・勤務時間を入力してください");
    $('registerNote').textContent=editingShiftId?translate("保存すると履歴・給与集計・カレンダー・今後の出力に反映します。"):($('workplace').value?translate("勤務先設定も入力内容で更新します。"):translate("勤務先・時給も一緒に保存します。"));
    $('estimateNet').textContent = valid ? netLabel([s]) : '—';
    const overlap = valid ? overlaps(data.shifts, s, editingShiftId) : [];
    $('overlapWarning').hidden = !overlap.length;
    $('overlapWarning').textContent = overlapMessage(overlap);
    return result;
  }
  $('workplace').addEventListener('change',applyWorkSelection);
  $('shiftForm').addEventListener('input',()=>{shiftDirty=true;renderEstimate();});
  $('shiftForm').addEventListener('change',()=>{shiftDirty=true;renderEstimate();});
  ['start','end'].forEach(id=>$(id).addEventListener('blur',()=>{const t=normalizeTime($(id).value);if(t)$(id).value=t;renderEstimate();}));
  let shiftDirty = false, selectedWorkId = null, selectedWorkSnapshot = null, limitsDirty = false, limitsBaseline = [];
  let lastCalendarDay = '', calendarTimer, historyMonthPinned = false;
  let workSaving = false, limitsSaving = false, editingWorkSnapshot = null;
  const shiftRowsById = new Map(), shiftElements = new Map(), workElements = new Map();
  function setFormBusy(id, busy) {
    $(id).querySelectorAll('input, select, button').forEach(el => { el.disabled = busy; });
  }
  function refreshViews() {
    syncWorkSelect();
    if (!shiftDirty && !editingShiftId) applyWorkSelection(); else renderEstimate();
    if (page === 'dashboard') renderDashboard();
    if (page === 'history') renderHistory();
    if (page === 'calendar') renderMonthCalendar();
    if (page === 'settings') { renderWorks(); if (!limitsDirty) renderLimits(); renderExtras(); }
    syncPeriodChoices(); renderPatternChoices();
  }
  function refreshWorkChoices(savedId = null) {
    const selected = $('workplace').value;
    syncWorkSelect(selected || (!shiftDirty ? savedId : ''));
    if (!shiftDirty && !editingShiftId) applyWorkSelection(); else renderEstimate();
  }
  // Validation inside the same IDB transaction makes overlap checks atomic.
  async function registerShift(raw, selectedId, baseline, editId = null, editBaseline = null) {
    const result = validateShift(raw);
    if (Object.keys(result.errors).length) return result;
    const s = result.shift, {errors, ...desired} = validateWork(raw);
    return commit(latest => {
      const saved = editId && latest.shifts.find(s=>s.id===editId);
      if (editId && !saved) return {errors:{date:translate("このシフトは別の操作で削除されています。編集をキャンセルして履歴を確認してください。")}};
      if (saved && JSON.stringify(saved)!==JSON.stringify(editBaseline)) return {errors:{date:translate("編集中に別のタブで更新されました。入力を控え、編集をキャンセルして開き直してください。")}};
      const conflicts = overlaps(latest.shifts,s,editId);
      if (conflicts.length) return {errors:{start:overlapMessage(conflicts)}};
      const selectedWork = latest.works.find(w=>w.id===selectedId);
      if (selectedId && !selectedWork && !(saved?.workId===selectedId)) return {errors:{name:translate("選択した勤務先が削除されています。勤務先を選び直してください。")}};
      const existing = selectedWork || (!selectedId ? latest.works.find(w=>w.name===s.work) : null);
      let work = existing, operations=[];
      if (!editId) {
        const changes = selectedId && baseline ? Object.fromEntries(Object.entries(desired).filter(([key,value])=>value!==baseline[key])) : desired;
        work = existing ? {...existing,...changes} : {id:uid(),...desired};
        if (latest.works.some(w=>w.id!==work.id&&w.name===work.name)) return {errors:{name:translate("同じ名前の勤務先があります。勤務先を選び直してください。")}};
        if (!existing || Object.keys(changes).some(key=>work[key]!==existing[key])) operations.push({type:'putWork',mode:existing?'update':'create',fields:Object.keys(changes),value:work});
      } else if (!work && !selectedId) {
        work = {id:uid(),...desired};
        operations.push({type:'putWork',mode:'create',fields:WORK_FIELDS,value:work});
      }
      const shift = {...s,id:editId||uid(),workId:work?.id||selectedId,updatedAt:new Date().toISOString()};
      operations.push({type:editId?'updateShift':'addShift',value:shift});
      return {errors:{},shift,work,operations};
    });
  }
  async function submitShift(event) {
    event.preventDefault();
    if (registering) return;
    formHasErrors=true;
    const raw=readShift(), validation=validateShift(raw);
    displayErrors(validation.errors,fieldIds,'shiftError',true);
    if(Object.keys(validation.errors).length) return;
    registering=true;setFormBusy('shiftForm',true);
    try {
      const result=await registerShift(raw,selectedWorkId,selectedWorkSnapshot,editingShiftId,editingShiftSnapshot);
      if(Object.keys(result.errors).length){displayErrors(result.errors,fieldIds,'shiftError');return;}
      lastSavedShift=result.shift; lastSavedWork=result.work;
      $('saveChoiceTitle').textContent=editingShiftId?translate("シフトの変更を保存しました"):translate("シフトを保存しました");
      $('saveChoiceText').textContent=msg`${result.shift.date.replace(/-/g,'/')}・${result.shift.work} ${result.shift.start}〜${result.shift.end} ／ 給与 ${yen(result.shift.pay)}`;
      $('saveChoice').hidden=false; $('shiftForm').hidden=true;
      formHasErrors=false;shiftDirty=false;
      editingShiftId=null;editingShiftSnapshot=null;
      $('returnAfterSave').textContent=msg`${(pageText()[shiftReturnPage]||pageText().history)[0]}へ戻る`;
      $('continueShift').focus({preventScroll:true});
      window.scrollTo({top:0,behavior:'auto'});
    } catch(error) {
      $('shiftError').hidden=false;
      $('shiftError').textContent=writingLocked?error.message:translate("保存できませんでした。入力内容は残しています。画面上部の案内をご確認ください。");
    } finally {registering=false;setFormBusy('shiftForm',false);}
  }
  $('shiftForm').addEventListener('submit',submitShift);
  function resetShiftForm(continuing=false) {
    editingShiftId=null;editingShiftSnapshot=null;formHasErrors=false;
    $('shiftForm').hidden=false;$('saveChoice').hidden=true;$('cancelShiftEdit').hidden=true;
    $('registerShift').innerHTML=icon('plus')+translate("このシフトを登録");
    $('shiftForm').reset();
    const previous=lastSavedShift;
    $('shiftDate').value=continuing&&previous?addDays(previous.date,1):today();
    const workId=lastSavedWork?.id || previous?.workId || selectedWorkId || '';
    syncWorkSelect(data.works.some(w=>w.id===workId)?workId:'');applyWorkSelection();
    if(continuing&&previous) {
      $('start').value=previous.start;$('end').value=previous.end;
      $('breakMinutes').value=previous.rest;$('nightBreak').value=previous.nightRest;
    }
    $('isConfirmed').checked=false;shiftDirty=continuing;
    displayErrors({},fieldIds,'shiftError');renderEstimate();
    if(page==='shift') $('pageTitle').textContent=translate("シフト登録");
  }
  $('continueShift').addEventListener('click',()=>{resetShiftForm(true);$('shiftDate').focus({preventScroll:true});});
  $('returnAfterSave').addEventListener('click',()=>{const back=shiftReturnPage;resetShiftForm();showPage(back,true);});
  $('cancelShiftEdit').addEventListener('click',()=>{if(registering)return;const back=shiftReturnPage;resetShiftForm();showPage(back,true);});
  function openShiftEditor(id) {
    if(registering)return;
    const s=data.shifts.find(s=>s.id===id);
    if(!s){notify(translate("このシフトは削除されています。"));return;}
    editingShiftId=id;editingShiftSnapshot={...s};shiftDirty=true;formHasErrors=false;
    showPage('shift',true);
    $('shiftForm').hidden=false;$('saveChoice').hidden=true;
    selectedWorkId=s.workId||null;
    selectedWorkSnapshot={name:s.work,rate:s.baseRate,nightRate:s.baseNightRate,weekendRate:s.weekendRate,weekendNightRate:s.weekendNightRate,travel:s.travel,color:s.color};
    syncWorkSelect(selectedWorkId);fillWorkFields(selectedWorkSnapshot);
    $('shiftDate').value=s.date;$('start').value=s.start;$('end').value=s.end;
    $('breakMinutes').value=s.rest;$('nightBreak').value=s.nightRest;$('isConfirmed').checked=s.confirmed;
    $('registerShift').innerHTML=icon('check')+translate("変更を保存");$('cancelShiftEdit').hidden=false;
    $('workHint').textContent=translate("登録時の時給を読み込んでいます。日付を変えると、このシフトに保存した通常・土日給から再計算します。勤務先の標準設定は設定画面から変更できます。");
    displayErrors({},fieldIds,'shiftError');renderEstimate();
  }

  function empty(title, description, action='shift', button=translate("シフトを登録"), symbol='calendar') {
    return `<div class="empty"><span class="panel-icon">${icon(symbol)}</span><p>${title}</p><p class="caption">${description}</p><button type="button" class="button small" data-page="${action}">${icon('plus')}${button}</button></div>`;
  }
  function dateTile(date) {return `<div class="date-tile"><small>${new Date(date+'T12:00:00Z').toLocaleDateString(locale(),{month:'short',timeZone:'UTC'})}</small><strong class="number">${+date.slice(8,10)}</strong></div>`;}
  function renderDashboard() {
    const day=today(), month=day.slice(0,7), year=day.slice(0,4);
    const todays=data.shifts.filter(s=>s.date===day), monthly=periodRows(), confirmed=monthly.filter(s=>s.confirmed);
    renderPeriodSummary(monthly);
    const annual=sum(data.shifts.filter(s=>s.date.startsWith(year)&&s.confirmed),'pay');
    $('todayTotal').textContent=yen(sum(todays,'pay')+sum(todays,'travel'));
    $('todayWage').textContent=yen(sum(todays,'pay')); $('todayTravel').textContent=yen(sum(todays,'travel'));
    $('todayHours').textContent=decimal(sum(todays,'hours'))+'h';
    $('confirmed').textContent=yen(sum(confirmed,'pay')); $('planned').textContent=yen(sum(monthly,'pay'));
    $('confirmedCount').textContent=msg`${confirmed.length}件`; $('plannedCount').textContent=msg`${monthly.length}件`;
    $('monthlyHours').innerHTML=esc(decimal(sum(monthly,'hours')))+'<span class="caption"> h</span>';
    $('monthlyNight').textContent=decimal(sum(monthly,'nightHours'))+' h';
    $('annualLabel').textContent=msg`${year}年の確定給与 ${yen(annual)}`;
    const upcoming=data.shifts.filter(s=>s.date>=day&&!s.confirmed).sort((a,b)=>(a.date+a.start).localeCompare(b.date+b.start)).slice(0,5);
    $('upcomingList').innerHTML=upcoming.length?upcoming.map(s=>`<div class="schedule-row colored" style="${colorStyle(s)}">${dateTile(s.date)}<div class="schedule-info"><strong>${esc(s.work)}</strong><span class="caption">${esc(s.start)} — ${esc(s.end)} ／ ${decimal(s.hours)}h</span></div><div class="schedule-money number">${yen(s.pay)}<br><span class="badge">${translate('予定')}</span></div></div>`).join(''):empty(translate("これからのシフトはありません"),translate("勤務先と時給を入力して、次のシフトを登録しましょう。"));
    $('dashboardWorks').innerHTML=data.works.length?data.works.map(w=>`<div class="mini-work" style="--work-color:${esc(w.color)}"><span class="work-avatar">${esc(Array.from(w.name)[0]||'W')}</span><div class="work-label"><strong>${esc(w.name)}</strong></div><div class="mini-rate number">${rateYen(w.rate)}<small>${translate('1時間あたり')}</small></div></div>`).join(''):empty(translate("勤務先を設定しましょう"),translate("バイト先の名前と時給を自由に入力できます。"),'settings',translate("勤務先を設定"),'briefcase');
    const enabled=data.limits.filter(l=>l.on);
    $('meters').innerHTML=enabled.length?enabled.map(l=>{
      const pct=Math.round(annual/l.amount*100);
      return `<div class="meter-block"><div class="row"><span class="meter-name">${msg`${yen(l.amount)}の目安`}</span><span class="meter-percent number">${pct}%</span></div><div class="meter-track" role="progressbar" aria-label="${msg`${yen(l.amount)}の目安`}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${Math.min(100,pct)}"><div class="meter-fill ${pct>=90?'warning':''}" style="width:${Math.min(100,annual/l.amount*100)}%"></div></div><div class="meter-meta"><span>${yen(annual)} / ${yen(l.amount)}</span><span>${annual>=l.amount?translate("設定額に達しています"):translate("残り ")+yen(l.amount-annual)}</span></div></div>`;
    }).join(''):("<p class=\"caption\">" + translate("年収の目安は非表示です。設定から有効にできます。") + "</p>");
  }
  function historyRows() {const month=$('historyMonth').value;return data.shifts.filter(s=>!month||s.date.startsWith(month)).sort((a,b)=>(b.date+b.start).localeCompare(a.date+a.start));}
  function deletePrompt(kind, id, label) {
    const attributes = {
      shift: ['data-delete-shift', 'data-cancel-delete'],
      calendar: ['data-calendar-delete', 'data-calendar-cancel'],
      work: ['data-delete-work', 'data-cancel-work-delete']
    };
    const [confirmAttr, cancelAttr] = attributes[kind];
    return `<div class="delete-prompt" role="group" aria-label="${esc(msg`${label}の削除確認`)}"><span class="delete-message" role="status">${translate('このデータを削除しますか？')}</span><div class="delete-actions"><button class="button small danger" type="button" ${confirmAttr}="${esc(id)}">${translate('削除する')}</button><button class="button small" type="button" ${cancelAttr}="${esc(id)}">${translate('キャンセル')}</button></div></div>`;
  }
  function shiftActions(s) {
    return `<button class="button small" type="button" data-edit-shift="${esc(s.id)}">${icon('edit')}${translate('編集')}</button>${!s.confirmed ? `<button class="button small" type="button" data-confirm="${esc(s.id)}">${icon('check')}${translate('実績確定')}</button>` : ''}${pendingDeleteId === s.id ? deletePrompt('shift', s.id, s.date + ' ' + s.work) : `<button class="icon-button danger" type="button" data-remove="${esc(s.id)}" aria-label="${esc(msg`${s.date + ' ' + s.work}のシフトを削除`)}">${icon('trash')}</button>`}`;
  }
  function renderHistory() {
    const rows = historyRows();
    shiftRowsById.clear(); shiftElements.clear();
    $('historyNet').textContent = netLabel(rows);
    $('historyCsv').innerHTML = icon('download') + ($('historyMonth').value ? translate("この月のCSV") : translate("全期間のCSV"));
    $('historyIcs').textContent = $('historyMonth').value ? translate("この月の .ics") : translate("全期間の .ics");
    $('historyPay').textContent = yen(sum(rows, 'pay')); $('historyCount').textContent = msg`${rows.length}件`;
    $('historyList').innerHTML = rows.length ? rows.map(s => `<article class="history-item colored" style="${colorStyle(s)}" data-shift-id="${esc(s.id)}">${dateTile(s.date)}<div><h2 class="history-name">${esc(s.work)}</h2><p class="history-detail">${esc(s.start)} — ${esc(s.end)} / ${msg`実働 ${decimal(s.hours)}h`}<br>${msg`休憩 ${s.rest}分・時給 ${rateYen(s.rate)}`}<br>${msg`深夜時給 ${rateYen(s.nightRate ?? s.rate * 1.25)}`}</p></div><div class="history-value"><span class="badge ${s.confirmed ? 'confirmed' : ''}">${s.confirmed ? translate("確定") : translate("予定")}</span><strong class="number">${yen(s.pay)}</strong><span class="caption">${msg`交通費 ${yen(s.travel)}`}</span></div><div class="actions">${shiftActions(s)}</div></article>`).join('') : empty(translate("この月のシフトはありません"), translate("シフトを登録すると、ここで確認・確定できます。"));
    rows.forEach(s => shiftRowsById.set(s.id, s));
    $('historyList').querySelectorAll('[data-shift-id]').forEach(el => shiftElements.set(el.dataset.shiftId, el));
  }
  function setShiftDeletion(id) {
    const previous = pendingDeleteId; pendingDeleteId = id;
    for (const key of new Set([previous, id])) {
      const row = shiftElements.get(key), shift = shiftRowsById.get(key);
      if (row && shift) row.querySelector('.actions').innerHTML = shiftActions(shift);
    }
  }
  function cancelShiftDeletion() {
    const id = pendingDeleteId; setShiftDeletion(null);
    shiftElements.get(id)?.querySelector('[data-remove]')?.focus({ preventScroll: true });
  }
  $('historyMonth').addEventListener('change', () => { historyMonthPinned = true; pendingDeleteId = null; renderHistory(); });
  $('historyList').addEventListener('click', async event => {
    const button = event.target.closest('button'); if (!button) return;
    if (button.dataset.editShift) { openShiftEditor(button.dataset.editShift); return; }
    if (button.dataset.remove) { setShiftDeletion(button.dataset.remove); shiftElements.get(pendingDeleteId)?.querySelector('[data-cancel-delete]')?.focus({ preventScroll: true }); return; }
    if (button.dataset.cancelDelete) { cancelShiftDeletion(); return; }
    const remove = button.dataset.deleteShift && button.dataset.deleteShift === pendingDeleteId;
    const id = remove ? button.dataset.deleteShift : button.dataset.confirm;
    if (!id || button.disabled) return;
    button.disabled = true;
    try {
      await commit(latest => ({ operations: latest.shifts.some(s => s.id === id) ? [{ type: remove ? 'removeShift' : 'confirmShift', id }] : [] }));
      pendingDeleteId = null; refreshViews();
      if (remove) { $('successNotice').hidden = true; if (page === 'history') { const first = $('historyList').querySelector('button'); (first || $('main')).focus({preventScroll:true}); } }
      notify(remove ? translate("削除しました。保存データを更新しました。") : translate("勤務実績を確定しました。"));
    } catch { notify(translate("保存できませんでした。データは削除・変更していません。画面上部の案内をご確認ください。")); }
    finally { button.disabled = false; }
  });
  $('historyList').addEventListener('keydown', event => { if (event.key === 'Escape' && pendingDeleteId) { event.preventDefault(); cancelShiftDeletion(); } });

  function workActions(w) {
    return `<button class="button small" type="button" data-edit="${esc(w.id)}">${icon('edit')}${translate('編集')}</button>${pendingWorkDeleteId === w.id ? deletePrompt('work', w.id, w.name) : `<button class="icon-button danger" type="button" data-delete="${esc(w.id)}" aria-label="${esc(msg`${w.name}を削除`)}">${icon('trash')}</button>`}`;
  }
  function renderWorks() {
    workElements.clear();
    $('workplaces').innerHTML = data.works.map(w => `<article class="work-card colored" style="--work-color:${esc(w.color)}" data-work-id="${esc(w.id)}"><div class="row"><div class="min-w-0"><h3>${esc(w.name)}</h3><p><span class="number rate">${rateYen(w.rate)}</span><span class="caption">${translate(' / 時間')}</span></p><p class="caption">${msg`深夜時給 ${rateYen(w.nightRate ?? w.rate * 1.25)}`}${translate(' / 時間')}${w.nightRate == null ? translate("（自動）") : ''}</p><p class="caption">${translate('土日')} ${w.weekendRate === null ? translate("通常と同じ") : rateYen(w.weekendRate) + translate(" / 深夜 ") + rateYen(w.weekendNightRate ?? w.weekendRate*1.25)}</p><p class="caption">${w.travel ? translate("交通費 ") + yen(w.travel) + translate(" / 勤務") : translate("交通費なし")}</p></div><span class="work-avatar">${icon('briefcase')}</span></div><div class="actions">${workActions(w)}</div></article>`).join('') || ("<p class=\"caption work-empty-note\">" + translate("勤務先はまだ登録されていません。名前と時給を入力して保存してください。") + "</p>");
    $('workplaces').querySelectorAll('[data-work-id]').forEach(el => workElements.set(el.dataset.workId, el));
  }
  function setWorkDeletion(id) {
    const previous = pendingWorkDeleteId; pendingWorkDeleteId = id;
    for (const key of new Set([previous, id])) {
      const row = workElements.get(key), work = data.works.find(w => w.id === key);
      if (row && work) row.querySelector('.actions').innerHTML = workActions(work);
    }
  }
  function cancelWorkDeletion() {
    const id = pendingWorkDeleteId; setWorkDeletion(null);
    workElements.get(id)?.querySelector('[data-delete]')?.focus({ preventScroll: true });
  }
  function editWork(id = null, focus = true) {
    if (workSaving) return;
    setWorkDeletion(null);
    const w = data.works.find(w => w.id === id); editingWorkId = w ? w.id : null; editingWorkSnapshot = w ? { ...w } : null;
    $('workTitle').textContent = w ? translate("勤務先を編集") : translate("新しい勤務先");
    $('workName').value = w ? w.name : ''; $('workRate').value = w ? String(w.rate) : '';
    $('workNightRate').value = w && w.nightRate != null ? String(w.nightRate) : ''; $('workTravel').value = w ? String(w.travel) : '0';
    $('workWeekendRate').value = w?.weekendRate ?? ''; $('workWeekendNightRate').value = w?.weekendNightRate ?? ''; $('workColor').value = w?.color ?? '#bcf778';
    displayErrors({}, workFieldIds, 'workError');
    if (focus) { $('workEditor').scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'center' }); $('workName').focus({ preventScroll: true }); }
  }
  $('newWork').addEventListener('click', () => editWork()); $('cancelWork').addEventListener('click', () => editWork());
  $('workplaces').addEventListener('click', async event => {
    const button = event.target.closest('button'); if (!button) return;
    if (button.dataset.edit) { editWork(button.dataset.edit); return; }
    if (button.dataset.delete) { setWorkDeletion(button.dataset.delete); workElements.get(pendingWorkDeleteId)?.querySelector('[data-cancel-work-delete]')?.focus({ preventScroll: true }); return; }
    if (button.dataset.cancelWorkDelete) { cancelWorkDeletion(); return; }
    const id = button.dataset.deleteWork;
    if (!id || id !== pendingWorkDeleteId || button.disabled) return;
    button.disabled = true;
    try {
      await commit(latest => ({ operations: latest.works.some(w => w.id === id) ? [{ type: 'removeWork', id }] : [] }));
      pendingWorkDeleteId = null; refreshViews();
      if (editingWorkId === id) editWork(null, false);
      if (page === 'settings') $('newWork').focus({ preventScroll: true });
      notify(translate("削除しました。保存データを更新しました。"));
    } catch { notify(translate("保存できませんでした。勤務先は削除していません。画面上部の案内をご確認ください。")); }
    finally { button.disabled = false; }
  });
  $('workplaces').addEventListener('keydown', event => { if (event.key === 'Escape' && pendingWorkDeleteId) { event.preventDefault(); cancelWorkDeletion(); } });
  $('workForm').addEventListener('submit', async event => {
    event.preventDefault(); if (workSaving) return;
    const result = validateWork({ name: $('workName').value, rate: $('workRate').value, nightRate: $('workNightRate').value, travel: $('workTravel').value,weekendRate:$('workWeekendRate').value,weekendNightRate:$('workWeekendNightRate').value,color:$('workColor').value });
    displayErrors(result.errors, workFieldIds, 'workError', true);
    if (Object.keys(result.errors).length) return;
    const editing = editingWorkId, baseline = editingWorkSnapshot;
    workSaving = true; setFormBusy('workForm', true); $('newWork').disabled = true;
    try {
      const outcome = await commit(latest => {
        if (editing && !latest.works.some(w => w.id === editing)) return { errors: { name: translate("この勤務先は別の操作で削除されています。入力をクリアして登録し直してください。") } };
        const {errors, ...desired} = result;
        const changes = baseline ? Object.fromEntries(Object.entries(desired).filter(([key, value]) => value !== baseline[key])) : desired;
        const work = { ...(latest.works.find(w => w.id === editing) || { id: uid() }), ...changes };
        if (latest.works.some(w => w.name === work.name && w.id !== editing)) return { errors: { name: translate("同じ名前の勤務先があります。一覧の「編集」から変更してください。") } };
        return { errors: {}, work, operations: [{ type: 'putWork', mode: editing ? 'update' : 'create', fields: Object.keys(changes), value: work }] };
      });
      if (Object.keys(outcome.errors).length) { displayErrors(outcome.errors, workFieldIds, 'workError'); return; }
      workSaving = false; editWork(null, false); refreshWorkChoices(outcome.work.id); refreshViews();
      notify(translate("勤務先を保存しました。シフト登録で選択できます。"));
    } catch {
      $('workError').hidden = false; $('workError').textContent = translate("保存できませんでした。入力内容は残しています。画面上部の案内をご確認ください。");
    } finally { workSaving = false; setFormBusy('workForm', false); $('newWork').disabled = false; }
  });
  function renderLimits() {
    limitsBaseline = data.limits.map(l => ({ ...l }));
    $('limits').innerHTML = limitsBaseline.map((l, i) => `<div class="limit-edit"><label><input type="checkbox" id="limitOn${i}" ${l.on ? 'checked' : ''}>${i === 2 ? translate("カスタム目安") : translate("目安 ") + (i + 1)}</label><div class="input-with-unit"><input type="text" inputmode="numeric" id="limitValue${i}" value="${l.amount}" aria-label="${msg`目安${i + 1}の金額（円）`}"><span class="input-unit">${translate('円')}</span></div></div>`).join('');
  }
  $('limitsForm').addEventListener('input', () => { limitsDirty = true; });
  $('limitsForm').addEventListener('change', () => { limitsDirty = true; });
  $('limitsForm').addEventListener('submit', async event => {
    event.preventDefault(); if (limitsSaving) return;
    let invalid = -1;
    const changes = limitsBaseline.map((baseline, index) => {
      const value = { amount: numberValue($('limitValue' + index).value), on: $('limitOn' + index).checked };
      if (!validLimit(value)) invalid = index;
      return { baseline, value, index };
    });
    $('limitsError').hidden = invalid < 0;
    if (invalid >= 0) { $('limitsError').textContent = translate("目安金額を1〜1,000,000,000円の整数で入力してください。"); $('limitValue' + invalid).focus(); return; }
    limitsSaving = true; setFormBusy('limitsForm', true);
    try {
      await commit(latest => ({ operations: changes.filter(c => c.value.amount !== c.baseline.amount || c.value.on !== c.baseline.on).filter(c => latest.limits[c.index]).map(c => ({ type: 'setLimit', index: c.index, fields: ['amount', 'on'].filter(key => c.value[key] !== c.baseline[key]), value: { amount: c.value.amount !== c.baseline.amount ? c.value.amount : latest.limits[c.index].amount, on: c.value.on !== c.baseline.on ? c.value.on : latest.limits[c.index].on } })) }));
      limitsDirty = false; refreshViews(); notify(translate("年収の目安を保存しました。"));
    } catch { $('limitsError').hidden = false; $('limitsError').textContent = translate("保存できませんでした。入力内容は残しています。画面上部の案内をご確認ください。"); }
    finally { limitsSaving = false; setFormBusy('limitsForm', false); }
  });
  const exportHeaders=()=>[translate("勤務日"),translate("勤務先"),translate("出勤"),translate("退勤"),translate("休憩(分)"),translate("深夜休憩(分)"),translate("実働(h)"),translate("深夜(h)"),translate("時給(円)"),translate("深夜時給(円)"),translate("給与(円)"),translate("交通費(円)"),translate("状態")];
  function exportRows(rows) {return rows.slice().sort((a,b)=>(a.date+a.start).localeCompare(b.date+b.start)).map(s=>[s.date,s.work,s.start,s.end,s.rest,s.nightRest,s.hours.toFixed(2),s.nightHours.toFixed(2),s.rate,s.nightRate ?? s.rate*1.25,s.pay,s.travel,s.confirmed?translate("確定"):translate("予定")]);}
  function exportCSV(rows, label) {
    const cell=value=>{let s=String(value);if(/^[\s]*[=+@\-\t\r]/.test(s))s="'"+s;return '"'+s.replace(/"/g,'""')+'"';};
    const csv='\uFEFF'+[exportHeaders(),...exportRows(rows)].map(row=>row.map(cell).join(',')).join('\r\n');
    const url=URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8'}));
    const a=document.createElement('a');a.href=url;a.download='shift-note-'+label+'.csv';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
  }
  $('csv').addEventListener('click', async () => { if (await refreshStored()) exportCSV(data.shifts, today()); });
  $('historyCsv').addEventListener('click', async () => { if (await refreshStored()) exportCSV(historyRows(), $('historyMonth').value || 'all'); });
  function downloadText(contents, type, filename) {
    const url = URL.createObjectURL(new Blob([contents], { type }));
    const a = document.createElement('a'); a.href = url; a.download = filename;
    document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  async function backupStorage() {
    try {
      let contents;
      try {
        const db = await openDatabase();
        contents = await transact(db, 'readonly', (tx, finish, fail) => {
          const archive = tx.objectStore('archive').getAll();
          let raw, archived;
          const complete = () => { if (raw && archived) finish({ data: { works: raw.works, shifts: raw.shifts, limits: raw.meta?.limits, patterns: raw.meta?.patterns ?? [], periods: raw.meta?.periods ?? [], deductions: raw.meta?.deductions ?? freshData().deductions }, meta: raw.meta, archive: archived }); };
          archive.onsuccess = () => { archived = archive.result; complete(); };
          readTransactionRecords(tx, value => { raw = value; complete(); }, fail);
        });
      } catch (error) {
        // If migration could not commit, its untouched legacy bytes can still
        // be backed up. Do not report a successful, empty backup on failure.
        const records = Object.fromEntries(readLegacy().records);
        if (!Object.keys(records).length) throw error;
        contents = { legacyRecords: records };
      }
      downloadText(JSON.stringify({ app: 'SHIFT NOTE', version: 4, exportedAt: new Date().toISOString(), ...contents }, null, 2), 'application/json', 'shift-note-backup-' + today() + '.json');
      notify(translate("元データのバックアップを書き出しました。"));
    } catch { notify(translate("バックアップを書き出せませんでした。ブラウザの保存設定をご確認ください。")); }
  }
  $('backupStorage').addEventListener('click', backupStorage);
  $('backupAll').addEventListener('click', backupStorage);
  const MAX_BACKUP_BYTES = 50 * 1024 * 1024;
  let selectedBackup = null, importPreview = null, importBusy = false, importReadToken = 0;
  class ImportConflictError extends Error {
    constructor() { super(translate("確認中にデータが更新されました。取り込み内容を更新したので、もう一度確認してください。")); }
  }
  function parseBackup(text) {
    let parsed;
    try { parsed = JSON.parse(String(text).replace(/^\uFEFF/, '')); }
    catch { throw new Error(translate("JSONファイルを読み込めませんでした。SHIFT NOTEのバックアップを選択してください。")); }
    if (!parsed || parsed.app !== 'SHIFT NOTE') throw new Error(translate("SHIFT NOTEのバックアップファイルではありません。"));
    if (parsed.version !== undefined && ![3,4].includes(parsed.version)) throw new Error(translate("このバックアップの形式には対応していません。"));
    let decoded, archive = [];
    if ([3,4].includes(parsed.version) && parsed.data) {
      decoded = decodeData(parsed.data);
      if (parsed.archive !== undefined && !Array.isArray(parsed.archive)) throw new Error(translate("バックアップの形式が正しくありません。"));
      // Imported archive records are evidence only. Never restore internal
      // migration markers or another browser's metadata as live state.
      archive = parsed.archive || [];
    } else {
      const raw = parsed.legacyRecords || parsed.records;
      if (!raw || typeof raw !== 'object' || Array.isArray(raw)) throw new Error(translate("バックアップに勤務データが見つかりませんでした。"));
      const records = new Map(Object.entries(raw));
      if (!records.size || [...records].some(([key, value]) => (key !== STORAGE_KEY && !key.startsWith(JOURNAL_PREFIX)) || typeof value !== 'string')) throw new Error(translate("バックアップの保存記録が正しくありません。"));
      decoded = decodeLegacyRecords(records);
      if (decoded.rejected.length) archive = [{ records: decoded.rejected }];
    }
    if (decoded.issues) throw new Error(msg`バックアップの${decoded.issues}か所を正しく読み込めないため、取り込みを中止しました。保存中のデータは変更していません。`);
    return { value: mergeDuplicateWorks(decoded.value), exportedAt: typeof parsed.exportedAt === 'string' ? parsed.exportedAt : '', archive };
  }
  function buildImportPlan(current, backup, mode) {
    if (!['merge', 'replace'].includes(mode)) throw new Error(translate("取り込み方法を選択してください。"));
    const source = backup.value;
    if (mode === 'replace') return { value: source, addedWorks: source.works.length, addedShifts: source.shifts.length, addedPatterns: source.patterns.length, addedPeriods: source.periods.length, skippedShifts: 0, operations: [] };
    const model = modelOf(current), workIds = new Map(), names = new Map(current.works.map(w => [w.name, w]));
    const operations = []; let addedWorks = 0, addedShifts = 0, skippedShifts = 0;
    for (const work of source.works) {
      const existing = model.works.get(work.id) || names.get(work.name);
      if (existing) { workIds.set(work.id, existing.id); continue; }
      workIds.set(work.id, work.id); model.works.set(work.id, work); names.set(work.name, work);
      operations.push({ type: 'putWork', mode: 'create', fields: WORK_FIELDS, value: work }); addedWorks++;
    }
    for (const saved of source.shifts) {
      if (model.shifts.has(saved.id)) { skippedShifts++; continue; }
      const shift = workIds.has(saved.workId) ? { ...saved, workId: workIds.get(saved.workId) } : saved;
      model.shifts.set(shift.id, shift); operations.push({ type: 'addShift', value: shift }); addedShifts++;
    }
    let addedPatterns=0, addedPeriods=0;
    for (const [key,type] of [['patterns','putPattern'],['periods','putPeriod']]) {
      for (const item of source[key]) {
        if (model[key].some(p=>p.id===item.id)) continue;
        const value={...item,workId:workIds.get(item.workId) ?? item.workId};
        model[key].push(value); operations.push({type,value});
        if(key==='patterns') addedPatterns++; else addedPeriods++;
      }
    }
    return { value: valueOf(model), addedWorks, addedShifts, skippedShifts, addedPatterns, addedPeriods, operations };
  }
  async function prepareImport(backup, mode) {
    const current = await readStored(true);
    if (current.issues && mode === 'merge') throw new Error(translate("保存データの復旧が必要です。画面上部から復旧するか、「すべて置き換える」を選択してください。"));
    return { backup, mode, revision: current.version, current: current.value, plan: buildImportPlan(current.value, backup, mode) };
  }
  function importBackup(preview) {
    const execute = async () => {
      const db = await openDatabase();
      const outcome = await transact(db, 'readwrite', (tx, finish, fail) => {
        readTransactionRecords(tx, raw => {
          const current = decodeStoredRecords(raw);
          if (current.version !== preview.revision) throw new ImportConflictError();
          if (current.issues && preview.mode === 'merge') throw new Error(translate("保存データを復旧してから取り込んでください。"));
          const plan = buildImportPlan(current.value, preview.backup, preview.mode);
          if (preview.mode === 'merge' && !plan.operations.length) { finish({ loaded: current, plan, changed: false }); return; }
          if (current.version >= Number.MAX_SAFE_INTEGER) throw new Error(translate("保存記録の上限に達しました。"));
          const model = modelOf(plan.value);
          if (preview.mode === 'replace') {
            tx.objectStore('works').clear(); tx.objectStore('shifts').clear();
            model.works.forEach(w => tx.objectStore('works').put(w));
            model.shifts.forEach(s => tx.objectStore('shifts').put(s));
            const archive = tx.objectStore('archive'), pending = archive.get('migration-pending');
            pending.onsuccess = () => {
              try {
                archive.clear();
                // Finish any interrupted cleanup in this browser; imported
                // migration markers remain opaque inside imported-archive.
                if (pending.result) archive.put(pending.result);
                if (preview.backup.archive.length) archive.put({ id: 'imported-archive', records: preview.backup.archive });
              } catch (error) { fail(error); }
            };
          } else writeChangedRecords(tx, model, plan.operations);
          if (preview.mode === 'merge' && preview.backup.archive.length) tx.objectStore('archive').put({ id: 'imported-archive', records: preview.backup.archive });
          const version = current.version + 1;
          tx.objectStore('meta').put({ id: 'state', revision: version, limits: model.limits, patterns: model.patterns, periods: model.periods, deductions: model.deductions, issues: 0 });
          finish({ loaded: { value: valueOf(model), version, issues: 0 }, plan, changed: true });
        }, fail);
      });
      acceptStored(outcome.loaded);
      if (outcome.changed) { try { changeChannel?.postMessage({ revision: outcome.loaded.version }); } catch { /* Polling also refreshes other tabs. */ } }
      return outcome;
    };
    const pending = commitQueue.then(execute);
    commitQueue = pending.catch(() => {});
    return pending;
  }
  function importError(message = '') { $('importError').textContent = message; $('importError').hidden = !message; }
  function clearImport() {
    selectedBackup = null; importPreview = null; importReadToken++;
    $('backupFile').value = ''; $('importReview').hidden = true; $('importConfirm').disabled = true; importError();
  }
  function displayImportPreview(preview) {
    const { plan, current, mode } = preview;
      $('importSummary').textContent = mode === 'replace'
        ? msg`現在の勤務先 ${current.works.length}件・シフト ${current.shifts.length}件・パターン・期間・控除設定・目安金額を、バックアップの勤務先 ${plan.addedWorks}件・シフト ${plan.addedShifts}件・パターン ${plan.addedPatterns}件・期間 ${plan.addedPeriods}件・控除設定・目安金額に置き換えます。`
        : msg`勤務先 ${plan.addedWorks}件・シフト ${plan.addedShifts}件・パターン ${plan.addedPatterns}件・期間 ${plan.addedPeriods}件を追加します。登録済みのシフト ${plan.skippedShifts}件は追加せず、現在の内容を優先します。既存の勤務先・パターン・期間・控除設定・目安金額は維持します。時間帯の重複を含む履歴も復元されます。`;
      $('importConfirm').textContent = mode === 'replace' ? translate("この内容で置き換える") : translate("この内容を取り込む");
      $('importConfirm').classList.toggle('danger', mode === 'replace');
      $('importConfirm').classList.toggle('primary', mode !== 'replace');
      $('importConfirm').disabled = importBusy;
  }
  async function renderImportPreview() {
    importPreview = null; $('importConfirm').disabled = true;
    if (!selectedBackup) return;
    const backup = selectedBackup, mode = $('importMode').value, token = importReadToken;
    try {
      const preview = await prepareImport(backup, mode);
      if (backup !== selectedBackup || token !== importReadToken || mode !== $('importMode').value) return;
      importPreview = preview;
      displayImportPreview(preview);
    } catch (error) {
      if (backup === selectedBackup && token === importReadToken && mode === $('importMode').value) importError(error.message || translate("取り込み内容を確認できませんでした。"));
    }
  }
  async function readBackupFile(file) {
    if (importBusy || !file) return;
    clearImport(); const token = importReadToken;
    try {
      if (!file.size || file.size > MAX_BACKUP_BYTES) throw new Error(translate("空のファイルは読み込めません。50MB以下のJSONバックアップを選択してください。"));
      const text = typeof file.text === 'function' ? await file.text() : await new Promise((resolve, reject) => {
        const reader = new FileReader(); reader.onload = () => resolve(reader.result); reader.onerror = () => reject(new Error(translate("ファイルを読み込めませんでした。"))); reader.readAsText(file);
      });
      if (token !== importReadToken) return;
      selectedBackup = parseBackup(text);
      $('importFileName').textContent = file.name;
      const value = selectedBackup.value; let first = '', last = '';
      for (const shift of value.shifts) { if (!first || shift.date < first) first = shift.date; if (!last || shift.date > last) last = shift.date; }
      $('importFileInfo').textContent = msg`勤務先 ${value.works.length}件・シフト ${value.shifts.length}件${first ? ` / ${first}–${last}` : ''}`;
      $('importMode').value = 'merge'; $('importReview').hidden = false;
      await renderImportPreview(); $('importMode').focus({ preventScroll: true });
    } catch (error) { if (token === importReadToken) importError(error.message || translate("バックアップを読み込めませんでした。")); }
  }
  async function confirmImport() {
    if (importBusy || !importPreview) return;
    const preview = importPreview; importBusy = true; importError();
    ['importOpen', 'importMode', 'importConfirm', 'importCancel', 'backupFile'].forEach(id => { $(id).disabled = true; });
    try {
      const outcome = await importBackup(preview);
      clearImport(); refreshViews();
      notify(preview.mode === 'replace' ? msg`バックアップからシフト ${outcome.plan.addedShifts}件を復元しました。` : msg`勤務先 ${outcome.plan.addedWorks}件・シフト ${outcome.plan.addedShifts}件を取り込みました。`);
    } catch (error) {
      if (error instanceof ImportConflictError) await renderImportPreview();
      importError(error instanceof ImportConflictError ? error.message : msg`取り込めませんでした。保存中のデータは変更していません。${error.message || translate("空き容量や保存設定をご確認ください。")}`);
    } finally {
      importBusy = false;
      ['importOpen', 'importMode', 'importCancel', 'backupFile'].forEach(id => { $(id).disabled = false; });
      $('importConfirm').disabled = !importPreview;
    }
  }
  $('importOpen').addEventListener('click', () => { if (!importBusy) $('backupFile').click(); });
  $('backupFile').addEventListener('change', event => readBackupFile(event.target.files?.[0]));
  $('importMode').addEventListener('change', () => { importError(); renderImportPreview(); });
  $('importCancel').addEventListener('click', () => { if (!importBusy) { clearImport(); $('importOpen').focus(); } });
  $('importConfirm').addEventListener('click', confirmImport);

  $('recoverStorage').addEventListener('click', () => { $('recoveryConfirm').hidden = false; $('cancelRecovery').focus(); });
  $('cancelRecovery').addEventListener('click', () => { $('recoveryConfirm').hidden = true; $('recoverStorage').focus(); });
  $('confirmRecovery').addEventListener('click', async () => {
    $('confirmRecovery').disabled = true;
    try {
      await commit(() => ({}), true);
      $('recoveryConfirm').hidden = true; refreshViews();
      notify(translate("正常なデータで保存を再開しました。元データも保持しています。"));
    } catch { notify(translate("復旧内容を保存できませんでした。元データは保持しています。")); }
    finally { $('confirmRecovery').disabled = false; }
  });
  function renderPrintReport() {
    $('printReport').innerHTML = `<h1>${translate('SHIFT NOTE — シフト・給与一覧')}</h1><p>${msg`出力日：${today()}`}</p><table><thead><tr>${exportHeaders().map(h => '<th>' + esc(h) + '</th>').join('')}</tr></thead><tbody>${exportRows(data.shifts).map(row => '<tr>' + row.map(value => '<td>' + esc(value) + '</td>').join('') + '</tr>').join('')}</tbody></table><p>${msg`給与合計：${yen(sum(data.shifts, 'pay'))} ／ 交通費合計：${yen(sum(data.shifts, 'travel'))}`}</p><p>${translate('予定を含む控除前の概算。設定した土日給・深夜時給を反映します。法定の残業・休日割増は別計算です。給与は控除前の概算です。')}</p>`;
  }
  window.addEventListener('beforeprint', renderPrintReport);
  $('pdf').addEventListener('click', async () => { if (await refreshStored()) { renderPrintReport(); window.print(); } });
  function refreshCalendar(render = true) {
    const now = new Date(), day = today(), changed = day !== lastCalendarDay;
    if (changed) {
      lastCalendarDay = day;
      renderHeaderDate();
      if (!shiftDirty && !editingShiftId) $('shiftDate').value = day;
      const monthChanged = !historyMonthPinned && $('historyMonth').value !== day.slice(0, 7);
      if (!historyMonthPinned) $('historyMonth').value = day.slice(0, 7);
      if (render && page === 'dashboard') renderDashboard();
      if (render && page === 'calendar') renderMonthCalendar();
      if (render && page === 'history' && monthChanged) renderHistory();
    }
    clearTimeout(calendarTimer);
    const midnight = new Date(now); midnight.setHours(24, 0, 0, 0);
    calendarTimer = setTimeout(() => refreshCalendar(), Math.max(100, midnight.getTime() - now.getTime() + 50));
    return changed;
  }
  let refreshTimer;
  const scheduleRefresh = () => { clearTimeout(refreshTimer); refreshTimer = setTimeout(() => refreshStored(), 0); };
  try {
    if (typeof BroadcastChannel !== 'undefined') {
      changeChannel = new BroadcastChannel(DB_NAME + ':changes');
      changeChannel.onmessage = scheduleRefresh;
    }
  } catch { changeChannel = null; }
  // A small revision read also covers suspended tabs and unavailable channels.
  setInterval(() => { if (!document.hidden) refreshStored(); }, changeChannel ? 15000 : 2500);
  window.addEventListener('focus', () => refreshStored());
  window.addEventListener('pageshow', () => refreshStored());
  document.addEventListener('visibilitychange', () => { if (!document.hidden) refreshStored(); });
  window.addEventListener('storage', event => {
    if (event.key === null || event.key === STORAGE_KEY || event.key?.startsWith(JOURNAL_PREFIX)) scheduleRefresh();
  });
  // v4 feature modules. Civil dates use UTC arithmetic to avoid DST drift.
  let editingShiftId=null, editingShiftSnapshot=null, shiftReturnPage='dashboard', lastSavedShift=null, lastSavedWork=null;
  let editingPatternId=null, patternBaseline=null, editingPeriodId=null, periodBaseline=null;
  let patternSaving=false, periodSaving=false, deductionSaving=false, deductionDirty=false, deductionBaseline=null;
  let pendingPatternDelete=null, pendingPeriodDelete=null, selectedCalendarDay=today();
  function validStamp(value) { return typeof value==='string' && /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d\.\d{3}Z$/.test(value) && Number.isFinite(Date.parse(value)); }
  function ratesFor(w,date) {
    const day=validDate(date)?new Date(date+'T12:00:00Z').getUTCDay():1;
    const weekend=(day===0||day===6)&&w.weekendRate!=null;
    return {rate:weekend?w.weekendRate:w.rate,nightRate:weekend?(w.weekendNightRate??null):(w.nightRate??null)};
  }
  function addDays(date,amount) { const d=new Date(date+'T12:00:00Z');d.setUTCDate(d.getUTCDate()+amount);return d.toISOString().slice(0,10); }
  function monthBounds(month) {
    if(!/^\d{4}-\d{2}$/.test(month)||!validDate(month+'-01')) return null;
    const d=new Date(month+'-01T12:00:00Z');d.setUTCMonth(d.getUTCMonth()+1,0);
    return {start:month+'-01',end:d.toISOString().slice(0,10)};
  }
  function interval(s) {
    const base=Date.parse(s.date+'T00:00:00Z'), minutes=t=>(+t.slice(0,2)*60 + +t.slice(3,5))*60000;
    const start=base+minutes(s.start),end=base+minutes(s.end)+(s.end<s.start?86400000:0);
    return {start,end};
  }
  function overlaps(rows,candidate,excludeId=null) {
    const a=interval(candidate);
    return rows.filter(s=>s.id!==excludeId).filter(s=>{const b=interval(s);return a.start<b.end&&b.start<a.end;});
  }
  function overlapMessage(rows) {
    if(!rows.length)return '';
    const details = rows.slice(0,3).map(s=>`${s.date} ${s.work} ${s.start}–${s.end}`).join(' / ');
    return msg`他のシフトと時間帯が重複しています。${details}${rows.length>3?msg` ほか${rows.length-3}件`:''}。勤務時間を確認してください。`;
  }
  function colorStyle(s) {
    const w=data.works.find(w=>w.id===s.workId)||(!s.workId?data.works.find(w=>w.name===s.work):null);
    return '--work-color:'+esc(w?.color||s.color||'#bcf778');
  }
  function workName(id) {return data.works.find(w=>w.id===id)?.name||translate("削除された勤務先");}
  function matchesWork(s,id) {return !id||s.workId===id||(!s.workId&&s.work===data.works.find(w=>w.id===id)?.name);}

  function storedPattern(raw) {
    if(!raw||!validId(raw.id)||!validId(raw.workId)||typeof raw.name!=='string'||!normalize(raw.name)||normalize(raw.name).length>60)throw new Error(translate("パターン名と勤務先を指定してください。"));
    if(typeof raw.start!=='string'||typeof raw.end!=='string'||!Number.isInteger(raw.rest)||!Number.isInteger(raw.nightRest))throw new Error(translate("パターンの時刻と休憩を確認してください。"));
    calculate(raw.start,raw.end,raw.rest,raw.nightRest,1000);
    return {id:raw.id,name:normalize(raw.name),workId:raw.workId,start:normalizeTime(raw.start),end:normalizeTime(raw.end),rest:raw.rest,nightRest:raw.nightRest};
  }
  function storedPeriod(raw) {
    if(!raw||!validId(raw.id)||typeof raw.name!=='string'||!normalize(raw.name)||normalize(raw.name).length>60)throw new Error(translate("期間の名前を1〜60文字で入力してください。"));
    if(!validDate(raw.start)||!validDate(raw.end)||raw.end<raw.start)throw new Error(translate("正しい開始日・終了日を選択してください。終了日は開始日以降にしてください。"));
    if(raw.workId!==''&&!validId(raw.workId))throw new Error(translate("集計する勤務先を選択してください。"));
    return {id:raw.id,name:normalize(raw.name),start:raw.start,end:raw.end,workId:raw.workId};
  }
  function storedDeductions(raw) {
    if(!raw||typeof raw.enabled!=='boolean'||!['tax','social','other'].every(k=>typeof raw[k]==='number'&&Number.isFinite(raw[k])&&raw[k]>=0&&raw[k]<=100&&/^\d+(\.\d{1,2})?$/.test(String(raw[k]))))throw new Error(translate("各控除率を0〜100%、小数第2位までで入力してください。"));
    if(raw.tax+raw.social+raw.other>100.000000001)throw new Error(translate("控除率の合計は100%以内にしてください。"));
    return {enabled:raw.enabled,tax:raw.tax,social:raw.social,other:raw.other};
  }
  function netEstimate(rows,settings=data.deductions) {
    const pay=sum(rows,'pay'),travel=sum(rows,'travel'),gross=pay+travel;
    if(!settings.enabled)return {gross,enabled:false};
    const amount=rate=>Number((BigInt(pay)*cents(rate)+5000n)/10000n);
    const tax=amount(settings.tax),social=amount(settings.social),other=amount(settings.other);
    // At a 100% total, independent rounding can exceed wages by one yen.
    const deductions=Math.min(pay,tax+social+other);
    return {gross,pay,travel,tax,social,other,deductions,rounding:tax+social+other-deductions,net:gross-deductions,enabled:true};
  }
  function netLabel(rows) {const result=netEstimate(rows);return result.enabled?yen(result.net):translate("未設定");}
  function fillSettingsWorkSelect(id,emptyText) {
    const selected=$(id).value;
    $(id).innerHTML=`<option value="">${emptyText}</option>`+data.works.map(w=>`<option value="${esc(w.id)}">${esc(w.name)}</option>`).join('')+(selected&&!data.works.some(w=>w.id===selected)?`<option value="${esc(selected)}" disabled>${translate('削除された勤務先')}</option>`:'');
    $(id).value=selected;
  }
  function setSimpleError(id,message='') {$(id).textContent=message;$(id).hidden=!message;}
  function renderExtras() {
    fillSettingsWorkSelect('patternWork',translate("勤務先を選択"));fillSettingsWorkSelect('periodWork',translate("すべての勤務先"));
    renderPatterns();renderPeriods();
    if(!deductionDirty) {
      deductionBaseline={...data.deductions};$('deductionEnabled').checked=data.deductions.enabled;
      for(const key of ['tax','social','other']) $('deduction'+key[0].toUpperCase()+key.slice(1)).value=data.deductions[key];
    }
    if(!$('periodStart').value&&!editingPeriodId){$('periodStart').value=today();$('periodEnd').value=addDays(today(),13);}
  }

  function syncPeriodChoices() {
    const selected=$('dashboardPeriod').value;
    $('dashboardPeriod').innerHTML=("<option value=\"month\">" + translate("月ごと") + "</option>")+data.periods.map(p=>`<option value="${esc(p.id)}">${esc(p.name)}</option>`).join('');
    $('dashboardPeriod').value=data.periods.some(p=>p.id===selected)?selected:'month';
    $('dashboardMonthField').hidden=$('dashboardPeriod').value!=='month';
  }
  function activePeriod() {
    const period=data.periods.find(p=>p.id===$('dashboardPeriod').value);
    return period||{...monthBounds($('dashboardMonth').value||today().slice(0,7)),workId:'',name:translate("月ごと")};
  }
  function rowsForPeriod(p) {return data.shifts.filter(s=>s.date>=p.start&&s.date<=p.end&&matchesWork(s,p.workId));}
  function periodRows() {syncPeriodChoices();return rowsForPeriod(activePeriod());}
  function renderPeriodSummary(rows) {
    const p=activePeriod(),n=netEstimate(rows);
    $('periodRange').textContent=msg`${p.start} 〜 ${p.end}（両端を含む） ／ ${p.workId?workName(p.workId):translate("すべての勤務先")} ／ 勤務開始日で集計`;
    $('periodGross').textContent=yen(n.gross);$('periodDeductions').textContent=n.enabled?yen(n.deductions):translate("未設定");$('periodNet').textContent=n.enabled?yen(n.net):translate("未設定");
    $('periodDeductionDetail').textContent=n.enabled?msg`所得税等 ${yen(n.tax)} ／ 社会保険料 ${yen(n.social)} ／ その他 ${yen(n.other)}${n.rounding?translate(" ／ 端数調整 +")+yen(n.rounding):''}（設定率による概算）`:translate("勤務先・設定の「概算手取りシミュレーション」で控除率を保存すると表示します。");
    const groups=new Map();
    for(const s of rows){const key=s.workId||s.work;if(!groups.has(key))groups.set(key,[]);groups.get(key).push(s);}
    $('periodByWork').innerHTML=[...groups.values()].map(group=>`<div class="compact-card colored" style="${colorStyle(group[0])}"><h3>${esc(group[0].work)}</h3><p class="caption">${msg`${group.length}件 ／ 給与 ${yen(sum(group,'pay'))} ／ 交通費 ${yen(sum(group,'travel'))} ／ 概算手取り ${netLabel(group)}`}</p></div>`).join('');
  }
  $('dashboardPeriod').addEventListener('change',renderDashboard);
  $('dashboardMonth').addEventListener('change',()=>{if(!monthBounds($('dashboardMonth').value))$('dashboardMonth').value=today().slice(0,7);renderDashboard();});
  function extraActions(type,id,pending) {
    return `<button class="button small" type="button" data-extra-edit="${esc(id)}">${translate('編集')}</button>`+(pending===id?`<span class="caption">${translate('削除しますか？')}</span><button class="button small danger" type="button" data-extra-confirm="${esc(id)}">${translate('削除する')}</button><button class="button small" type="button" data-extra-cancel="${esc(id)}">${translate('キャンセル')}</button>`:`<button class="icon-button danger" type="button" data-extra-delete="${esc(id)}" aria-label="${esc(msg`${type}を削除`)}">${icon('trash')}</button>`);
  }
  function renderPeriods() {
    $('periodList').innerHTML=data.periods.map(p=>{const rows=rowsForPeriod(p);return `<article class="compact-card"><h3>${esc(p.name)}</h3><p class="caption">${p.start}〜${p.end} ／ ${p.workId?esc(workName(p.workId)):translate("すべての勤務先")}</p><p>${translate('給与見込み')} <strong class="number">${yen(sum(rows,'pay'))}</strong></p><p class="caption">${msg`${rows.length}件 ／ 概算手取り ${netLabel(rows)}`}</p><div class="actions">${extraActions(translate("期間"),p.id,pendingPeriodDelete)}</div></article>`;}).join('')||("<p class=\"caption\">" + translate("保存した期間はダッシュボードから選べます。") + "</p>");
  }
  function resetPeriod() {
    editingPeriodId=null;periodBaseline=null;$('periodForm').reset();$('periodFormTitle').textContent=translate("期間を追加");
    $('periodStart').value=today();$('periodEnd').value=addDays(today(),13);setSimpleError('periodError');
  }
  $('periodTwoWeeks').addEventListener('click',()=>{if(validDate($('periodStart').value))$('periodEnd').value=addDays($('periodStart').value,13);else setSimpleError('periodError',translate("開始日を選択してください。"));});
  $('periodMonth').addEventListener('click',()=>{const p=monthBounds($('periodStart').value.slice(0,7));if(p)$('periodEnd').value=p.end;else setSimpleError('periodError',translate("開始日を選択してください。"));});
  $('cancelPeriod').addEventListener('click',()=>{if(!periodSaving)resetPeriod();});
  $('periodForm').addEventListener('submit',async event=>{
    event.preventDefault();if(periodSaving)return;
    let value;try{value=storedPeriod({id:editingPeriodId||uid(),name:$('periodName').value,start:$('periodStart').value,end:$('periodEnd').value,workId:$('periodWork').value});}catch(e){setSimpleError('periodError',e.message);return;}
    periodSaving=true;setFormBusy('periodForm',true);
    try{
      const result=await commit(latest=>{
        if(editingPeriodId&&JSON.stringify(latest.periods.find(p=>p.id===editingPeriodId))!==JSON.stringify(periodBaseline))return {errors:{form:translate("別の操作で期間が変更・削除されています。編集を開き直してください。")}};
        if(value.workId&&!latest.works.some(w=>w.id===value.workId)&&value.workId!==periodBaseline?.workId)return {errors:{form:translate("勤務先が削除されています。選び直してください。")}};
        return {operations:[{type:'putPeriod',value}]};
      });
      if(result.errors){setSimpleError('periodError',Object.values(result.errors)[0]);return;}
      resetPeriod();refreshViews();notify(translate("シフト表の期間を保存しました。"));
    }catch{setSimpleError('periodError',translate("保存できませんでした。入力内容は残しています。"));}finally{periodSaving=false;setFormBusy('periodForm',false);}
  });
  $('periodList').addEventListener('click',async event=>{
    const button=event.target.closest('button');if(!button||periodSaving)return;
    const id=button.dataset.extraEdit;
    if(id){const p=data.periods.find(p=>p.id===id);if(!p)return;editingPeriodId=id;periodBaseline={...p};$('periodName').value=p.name;$('periodStart').value=p.start;$('periodEnd').value=p.end;if(p.workId&&!data.works.some(w=>w.id===p.workId))$('periodWork').insertAdjacentHTML('beforeend',`<option value="${esc(p.workId)}" disabled>${translate('削除された勤務先')}</option>`);$('periodWork').value=p.workId;$('periodFormTitle').textContent=translate("期間を編集");setSimpleError('periodError');$('periodName').focus();return;}
    if(button.dataset.extraDelete){pendingPeriodDelete=button.dataset.extraDelete;renderPeriods();return;}
    if(button.dataset.extraCancel){pendingPeriodDelete=null;renderPeriods();return;}
    if(button.dataset.extraConfirm!==pendingPeriodDelete||!pendingPeriodDelete)return;
    button.disabled=true;
    try{const removed=pendingPeriodDelete;await commit(()=>({operations:[{type:'removePeriod',id:removed}]}));pendingPeriodDelete=null;if(editingPeriodId===removed)resetPeriod();refreshViews();notify(translate("期間を削除しました。シフトは残っています。"));}catch{notify(translate("期間を削除できませんでした。"));}finally{button.disabled=false;}
  });

  function renderPatterns() {
    $('patternList').innerHTML=data.patterns.map(p=>`<article class="compact-card"><h3>${esc(p.name)}</h3><p class="caption">${esc(workName(p.workId))} ／ ${p.start}〜${p.end}${p.end<p.start?translate("（翌日）"):''}</p><p class="caption">${msg`休憩 ${p.rest}分（うち深夜 ${p.nightRest}分）`}</p><div class="actions">${extraActions(translate("パターン"),p.id,pendingPatternDelete)}</div></article>`).join('')||("<p class=\"caption\">" + translate("勤務先を登録してからパターンを保存してください。") + "</p>");
  }
  function renderPatternChoices() {
    $('patternChoices').innerHTML=data.patterns.map(p=>`<button class="button" type="button" data-use-pattern="${esc(p.id)}" ${!data.works.some(w=>w.id===p.workId)?'disabled':''}><span>${esc(p.name)}<small>${esc(workName(p.workId))}<br>${p.start}〜${p.end} / ${msg`休憩 ${p.rest}分`}</small></span></button>`).join('')||("<p class=\"caption\">" + translate("まだパターンはありません。「勤務先・設定」から追加できます。") + "</p>");
  }
  $('patternChoices').addEventListener('click',event=>{
    const button=event.target.closest('[data-use-pattern]');if(!button||registering)return;
    const p=data.patterns.find(p=>p.id===button.dataset.usePattern),work=p&&data.works.find(w=>w.id===p.workId);
    if(!work){notify(translate("勤務先が削除されています。パターンの勤務先を変更してください。"));return;}
    syncWorkSelect(work.id);applyWorkSelection();$('start').value=p.start;$('end').value=p.end;$('breakMinutes').value=p.rest;$('nightBreak').value=p.nightRest;$('isConfirmed').checked=false;
    shiftDirty=true;renderEstimate();notify(msg`${p.name}を入力しました。勤務日を確認して保存してください。`);
  });
  function resetPattern(){editingPatternId=null;patternBaseline=null;$('patternForm').reset();$('patternFormTitle').textContent=translate("パターンを追加");setSimpleError('patternError');}
  $('cancelPattern').addEventListener('click',()=>{if(!patternSaving)resetPattern();});
  $('patternForm').addEventListener('submit',async event=>{
    event.preventDefault();if(patternSaving)return;
    let value;try{value=storedPattern({id:editingPatternId||uid(),name:$('patternName').value,workId:$('patternWork').value,start:$('patternStart').value,end:$('patternEnd').value,rest:numberValue($('patternRest').value),nightRest:numberValue($('patternNightRest').value)});}catch(e){setSimpleError('patternError',e.message);return;}
    patternSaving=true;setFormBusy('patternForm',true);
    try{
      const result=await commit(latest=>{
        if(editingPatternId&&JSON.stringify(latest.patterns.find(p=>p.id===editingPatternId))!==JSON.stringify(patternBaseline))return {errors:{form:translate("別の操作でパターンが変更・削除されています。編集を開き直してください。")}};
        if(!latest.works.some(w=>w.id===value.workId))return {errors:{form:translate("勤務先が削除されています。選び直してください。")}};
        if(latest.patterns.some(p=>p.id!==value.id&&p.workId===value.workId&&p.name===value.name))return {errors:{form:translate("この勤務先には同じ名前のパターンがあります。")}};
        return {operations:[{type:'putPattern',value}]};
      });
      if(result.errors){setSimpleError('patternError',Object.values(result.errors)[0]);return;}
      resetPattern();refreshViews();notify(translate("シフトパターンを保存しました。"));
    }catch{setSimpleError('patternError',translate("保存できませんでした。入力内容は残しています。"));}finally{patternSaving=false;setFormBusy('patternForm',false);}
  });
  $('patternList').addEventListener('click',async event=>{
    const button=event.target.closest('button');if(!button||patternSaving)return;
    const id=button.dataset.extraEdit;
    if(id){const p=data.patterns.find(p=>p.id===id);if(!p)return;editingPatternId=id;patternBaseline={...p};$('patternName').value=p.name;if(!data.works.some(w=>w.id===p.workId))$('patternWork').insertAdjacentHTML('beforeend',`<option value="${esc(p.workId)}" disabled>${translate('削除された勤務先')}</option>`);$('patternWork').value=p.workId;$('patternStart').value=p.start;$('patternEnd').value=p.end;$('patternRest').value=p.rest;$('patternNightRest').value=p.nightRest;$('patternFormTitle').textContent=translate("パターンを編集");setSimpleError('patternError');$('patternName').focus();return;}
    if(button.dataset.extraDelete){pendingPatternDelete=button.dataset.extraDelete;renderPatterns();return;}
    if(button.dataset.extraCancel){pendingPatternDelete=null;renderPatterns();return;}
    if(button.dataset.extraConfirm!==pendingPatternDelete||!pendingPatternDelete)return;
    button.disabled=true;
    try{const removed=pendingPatternDelete;await commit(()=>({operations:[{type:'removePattern',id:removed}]}));pendingPatternDelete=null;if(editingPatternId===removed)resetPattern();refreshViews();notify(translate("パターンを削除しました。登録済みシフトは残っています。"));}catch{notify(translate("パターンを削除できませんでした。"));}finally{button.disabled=false;}
  });
  $('deductionForm').addEventListener('input',()=>{deductionDirty=true;});
  $('deductionForm').addEventListener('submit',async event=>{
    event.preventDefault();if(deductionSaving)return;
    let value;try{value=storedDeductions({enabled:$('deductionEnabled').checked,tax:numberValue($('deductionTax').value),social:numberValue($('deductionSocial').value),other:numberValue($('deductionOther').value)});}catch(e){setSimpleError('deductionError',e.message);return;}
    deductionSaving=true;setFormBusy('deductionForm',true);
    try{
      const result=await commit(latest=>{
        const changes=Object.fromEntries(Object.entries(value).filter(([k,v])=>v!==deductionBaseline?.[k]));
        try{const merged=storedDeductions({...latest.deductions,...changes});return {operations:[{type:'setDeductions',value:merged}]};}catch(e){return {errors:{form:msg`${e.message} 別タブの変更も反映しています。`}};}
      });
      if(result.errors){setSimpleError('deductionError',Object.values(result.errors)[0]);return;}
      deductionDirty=false;setSimpleError('deductionError');refreshViews();notify(translate("控除設定を保存しました。"));
    }catch{setSimpleError('deductionError',translate("保存できませんでした。入力内容は残しています。"));}finally{deductionSaving=false;setFormBusy('deductionForm',false);}
  });

  function calendarDayRows(date) {
    const start=Date.parse(date+'T00:00:00Z');
    return data.shifts.filter(s=>{const t=interval(s);return t.start<start+86400000&&t.end>start;}).sort((a,b)=>(a.date+a.start).localeCompare(b.date+b.start));
  }
  function calendarMonthRows() {
    const bounds=monthBounds($('calendarMonth').value);
    if(!bounds)return [];
    const start=Date.parse(bounds.start+'T00:00:00Z'),end=Date.parse(addDays(bounds.end,1)+'T00:00:00Z');
    return data.shifts.filter(s=>{const t=interval(s);return t.start<end&&t.end>start;});
  }
  function calendarDaysMap() {
    const map=new Map();
    for(const s of data.shifts)for(const date of [s.date,...(s.end<s.start&&s.end!=='00:00'?[addDays(s.date,1)]:[])]){
      if(!map.has(date))map.set(date,[]);map.get(date).push(s);
    }
    for(const rows of map.values())rows.sort((a,b)=>(a.date+a.start).localeCompare(b.date+b.start));
    return map;
  }
  function renderMonthCalendar() {
    let month=$('calendarMonth').value,bounds=monthBounds(month);
    if(!bounds){month=today().slice(0,7);$('calendarMonth').value=month;bounds=monthBounds(month);}
    if(!selectedCalendarDay.startsWith(month))selectedCalendarDay=month===today().slice(0,7)?today():bounds.start;
    const map=calendarDaysMap(),weekday=new Date(bounds.start+'T12:00:00Z').getUTCDay(),first=addDays(bounds.start,-weekday);
    let days=0,streak=0,maxStreak=0;
    for(let date=bounds.start;date<=bounds.end;date=addDays(date,1)){if(map.has(date)){days++;streak++;maxStreak=Math.max(maxStreak,streak);}else streak=0;}
    $('calendarStats').textContent=msg`勤務がある日 ${days}日 ／ シフトなし ${+bounds.end.slice(8)-days}日 ／ 月内の最大連勤 ${maxStreak}日`;
    const works=new Map();
    for(const [date,rows] of map)if(date.startsWith(month))for(const s of rows)works.set(s.workId||s.work,s);
    $('calendarLegend').innerHTML=[...works.values()].map(s=>`<span style="${colorStyle(s)}"><span class="work-dot"></span>${esc(s.work)}</span>`).join('');
    const cells=Array.from({length:42},(_,i)=>{const date=addDays(first,i),rows=map.get(date)||[];return `<button type="button" class="calendar-day ${date.startsWith(month)?'':'outside'} ${date===today()?'today':''} ${date===selectedCalendarDay?'selected':''}" data-calendar-day="${date}" aria-pressed="${date===selectedCalendarDay}" aria-label="${date}、${rows.length?msg`${rows.length}件の勤務`:translate("シフトなし")}"><span class="day-number">${date.slice(8).replace(/^0/,'')}</span>${rows.slice(0,2).map(s=>`<span class="calendar-chip" style="${colorStyle(s)}">${s.date!==date?'↳ '+s.end:s.start} ${esc(s.work)}</span>`).join('')}${rows.length>2?`<span class="day-count">${msg`他${rows.length-2}件`}</span>`:''}</button>`;});
    $('calendarGrid').innerHTML=(language === 'en' ? ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'] : [translate("日"),translate("月"),translate("火"),translate("水"),translate("木"),translate("金"),translate("土")]).map((d,i)=>`<div class="weekday ${i===0?'sun':i===6?'sat':''}">${d}</div>`).join('')+cells.join('');
    renderCalendarDetails();
  }
  // Calendar actions use the same committed shift records as the history view.
  let pendingCalendarDelete = null;
  let calendarDeleteBaseline = null;
  let calendarDeleting = false;

  function resetCalendarDeletion() {
    pendingCalendarDelete = null;
    calendarDeleteBaseline = null;
  }

  function calendarRemoveButton(id) {
    return [...$('calendarDetails').querySelectorAll('[data-calendar-remove]')]
      .find(button => button.dataset.calendarRemove === id);
  }

  function cancelCalendarDeletion() {
    const id = pendingCalendarDelete;
    resetCalendarDeletion();
    renderCalendarDetails();
    calendarRemoveButton(id)?.focus({ preventScroll: true });
  }

  function renderCalendarDetails() {
    const date = selectedCalendarDay;
    const rows = calendarDayRows(date);
    if (pendingCalendarDelete && !rows.some(s => s.id === pendingCalendarDelete)) resetCalendarDeletion();
    const heading = `<div class="row"><h2>${msg`${date.replace(/-/g, '/')} の勤務`}</h2><button class="button small" type="button" data-add-calendar="${date}">${icon('plus')}${translate('登録')}</button></div>`;
    const cards = rows.map(s => `
      <article class="calendar-event colored" style="${colorStyle(s)}">
        <div class="calendar-event-info">
          <h3>${esc(s.work)}</h3>
          <p class="caption">${s.date !== date ? translate("前日 ") + s.start + '〜' : s.start + '〜'}${s.end}${s.end < s.start && s.date === date ? translate("（翌日）") : ''} ／ ${s.confirmed ? translate("確定") : translate("予定")}</p>
          <p class="caption">${msg`給与 ${yen(s.pay)} ／ 休憩 ${s.rest}分`}</p>
        </div>
        <div class="calendar-event-actions">
          <button class="button small" type="button" data-calendar-edit="${esc(s.id)}">${icon('edit')}${translate('編集')}</button>
          <button class="button small danger" type="button" data-calendar-remove="${esc(s.id)}" aria-label="${esc(msg`${s.date + ' ' + s.work}のシフトを削除`)}" aria-expanded="${pendingCalendarDelete === s.id}">${icon('trash')}${translate('削除')}</button>
        </div>
        ${pendingCalendarDelete === s.id ? deletePrompt('calendar', s.id, s.date + ' ' + s.work) : ''}
      </article>`).join('');
    $('calendarDetails').innerHTML = heading + (cards || ("<p class=\"caption\">" + translate("この日にシフトはありません。") + "</p>"));
    if (calendarDeleting) {
      $('calendarDetails').querySelectorAll('button').forEach(button => { button.disabled = true; });
    }
  }

  async function deleteCalendarShift(id) {
    if (calendarDeleting || !id || id !== pendingCalendarDelete) return;
    const baseline = calendarDeleteBaseline;
    calendarDeleting = true;
    renderCalendarDetails();
    try {
      const result = await commit(latest => {
        const saved = latest.shifts.find(s => s.id === id);
        if (!saved) return { missing: true, operations: [] };
        if (JSON.stringify(saved) !== JSON.stringify(baseline)) {
          return { errors: { shift: translate("削除の確認中にこのシフトが更新されました。新しい内容を確認して、もう一度削除してください。") } };
        }
        return { operations: [{ type: 'removeShift', id }] };
      });
      resetCalendarDeletion();
      calendarDeleting = false;
      refreshViews();
      if (result.errors) {
        notify(result.errors.shift);
        if (page === 'calendar') calendarRemoveButton(id)?.focus({ preventScroll: true });
        return;
      }
      $('successNotice').hidden = true;
      if (page === 'calendar') $('calendarDetails').querySelector('[data-add-calendar]')?.focus({ preventScroll: true });
      notify(result.missing ? translate("このシフトはすでに削除されています。") : translate("シフトを削除しました。給与集計と履歴も更新しています。"));
    } catch {
      notify(translate("保存できませんでした。シフトは削除していません。画面上部の案内をご確認ください。"));
    } finally {
      calendarDeleting = false;
      if (page === 'calendar') {
        $('calendarDetails').querySelectorAll('button').forEach(button => { button.disabled = false; });
      }
    }
  }

  $('calendarDetails').addEventListener('click', event => {
    const button = event.target.closest('button');
    if (!button || button.disabled || calendarDeleting) return;
    if (button.dataset.calendarEdit) {
      resetCalendarDeletion();
      openShiftEditor(button.dataset.calendarEdit);
    } else if (button.dataset.addCalendar) {
      resetCalendarDeletion();
      resetShiftForm();
      showPage('shift', true);
      $('shiftDate').value = button.dataset.addCalendar;
      shiftDirty = true;
      renderEstimate();
    } else if (button.dataset.calendarRemove) {
      const shift = data.shifts.find(s => s.id === button.dataset.calendarRemove);
      if (!shift) { renderMonthCalendar(); return; }
      pendingCalendarDelete = shift.id;
      calendarDeleteBaseline = { ...shift };
      renderCalendarDetails();
      $('calendarDetails').querySelector('[data-calendar-cancel]')?.focus({ preventScroll: true });
    } else if (button.dataset.calendarCancel) {
      cancelCalendarDeletion();
    } else if (button.dataset.calendarDelete) {
      deleteCalendarShift(button.dataset.calendarDelete);
    }
  });
  $('calendarDetails').addEventListener('keydown', event => {
    if (event.key === 'Escape' && pendingCalendarDelete && !calendarDeleting) {
      event.preventDefault();
      cancelCalendarDeletion();
    }
  });

  function moveCalendar(amount) {
    resetCalendarDeletion();
    const bounds=monthBounds($('calendarMonth').value);if(!bounds)return;
    const d=new Date(bounds.start+'T12:00:00Z');d.setUTCMonth(d.getUTCMonth()+amount);
    if(d.getUTCFullYear()<1000||d.getUTCFullYear()>9998)return;
    $('calendarMonth').value=d.toISOString().slice(0,7);renderMonthCalendar();
  }
  $('calendarPrev').addEventListener('click',()=>moveCalendar(-1));$('calendarNext').addEventListener('click',()=>moveCalendar(1));
  $('calendarToday').addEventListener('click',()=>{resetCalendarDeletion();$('calendarMonth').value=today().slice(0,7);selectedCalendarDay=today();renderMonthCalendar();});
  $('calendarMonth').addEventListener('change',()=>{resetCalendarDeletion();renderMonthCalendar();});
  $('calendarGrid').addEventListener('click',event=>{const button=event.target.closest('[data-calendar-day]');if(!button)return;resetCalendarDeletion();selectedCalendarDay=button.dataset.calendarDay;$('calendarMonth').value=selectedCalendarDay.slice(0,7);renderMonthCalendar();$('calendarGrid').querySelector(`[data-calendar-day="${selectedCalendarDay}"]`)?.focus({preventScroll:true});});

  // RFC 5545: UTC timestamps, TEXT escaping and UTF-8-safe 75-octet folding.
  // https://www.rfc-editor.org/rfc/rfc5545 (3.1, 3.3.5, 3.3.11, 3.6.1)
  function icsText(value) {return String(value).replace(/\\/g,'\\\\').replace(/\r\n|\r|\n/g,'\\n').replace(/;/g,'\\;').replace(/,/g,'\\,').replace(/[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]/g,'');}
  function foldIcs(line) {
    const encoder=new TextEncoder();let out='',length=0;
    for(const char of line){const bytes=encoder.encode(char).length;if(length+bytes>75){out+='\r\n ';length=1;}out+=char;length+=bytes;}
    return out;
  }
  function icsTimestamp(ms) {return new Date(ms).toISOString().replace(/[-:]/g,'').replace(/\.\d{3}Z$/,'Z');}
  function buildICS(rows,now=new Date().toISOString()) {
    const lines=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//SHIFT NOTE//Shift Calendar 4//' + language.toUpperCase(),'CALSCALE:GREGORIAN','X-WR-CALNAME:SHIFT NOTE','X-WR-TIMEZONE:Asia/Tokyo'];
    for(const s of rows.slice().sort((a,b)=>(a.date+a.start).localeCompare(b.date+b.start))){
      const t=interval(s),jst=9*60*60*1000;
      lines.push('BEGIN:VEVENT','UID:'+encodeURIComponent(s.id)+'@shift-note.local','DTSTAMP:'+icsTimestamp(now),'LAST-MODIFIED:'+icsTimestamp(s.updatedAt||now),'DTSTART:'+icsTimestamp(t.start-jst),'DTEND:'+icsTimestamp(t.end-jst),'SUMMARY:'+icsText(translate("シフト：")+s.work),'LOCATION:'+icsText(s.work),'DESCRIPTION:'+icsText(msg`勤務日 ${s.date}\n${s.start}〜${s.end}${s.end<s.start?translate("（翌日）"):''}\n休憩 ${s.rest}分（うち深夜 ${s.nightRest}分）\n給与 ${yen(s.pay)} / 交通費 ${yen(s.travel)}\n${s.confirmed?translate("確定"):translate("予定")}`),'STATUS:'+(s.confirmed?'CONFIRMED':'TENTATIVE'),'TRANSP:OPAQUE','END:VEVENT');
    }
    lines.push('END:VCALENDAR');return lines.map(foldIcs).join('\r\n')+'\r\n';
  }
  // Prepare first, then let a new click perform the browser/OS action.
  // navigator.share must be invoked with transient user activation:
  // https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share#security
  // Keep object URLs alive while the user can access their links:
  // https://developer.mozilla.org/en-US/docs/Web/URI/Reference/Schemes/blob#memory_management
  let preparedIcs = null;
  let preparingIcs = false;
  let sharingIcs = false;

  function retireIcsFile(prepared) {
    if (!prepared) return;
    // A mobile browser may still be reading a URL after its panel is closed.
    for (const url of [prepared.downloadUrl, prepared.openUrl]) {
      setTimeout(() => URL.revokeObjectURL(url), 5 * 60 * 1000);
    }
  }

  function canShareIcs(file) {
    try {
      return typeof navigator.share === 'function'
        && typeof navigator.canShare === 'function'
        && navigator.canShare({ files: [file] });
    } catch { return false; }
  }

  function closeIcsExport() {
    if (sharingIcs) return;
    const focusTarget = preparedIcs?.trigger;
    retireIcsFile(preparedIcs);
    preparedIcs = null;
    $('icsExportPanel').hidden = true;
    $('icsSave').removeAttribute('href');
    $('icsOpen').removeAttribute('href');
    if (focusTarget?.isConnected && !focusTarget.closest('[hidden]')) focusTarget.focus({ preventScroll: true });
  }

  function markIcsExportStale() {
    if (!preparedIcs || (!preparedIcs.stale && preparedIcs.revision === storageVersion && preparedIcs.language === language)) return;
    preparedIcs.stale = true;
    $('icsExportStatus').textContent = translate("シフト・設定・表示言語が変更されています。「最新の内容に更新」を押してから保存してください。");
    $('icsRefresh').hidden = false;
    for (const id of ['icsSave', 'icsOpen']) {
      $(id).removeAttribute('href');
      $(id).setAttribute('aria-disabled', 'true');
    }
    $('icsShare').hidden = true;
  }

  function currentIcsReady() {
    if (!preparedIcs || sharingIcs) return false;
    if (preparedIcs.stale || preparedIcs.revision !== storageVersion || preparedIcs.language !== language) { markIcsExportStale(); return false; }
    return true;
  }

  async function exportICS(getRows, getLabel, trigger = null) {
    if (preparingIcs || sharingIcs) return;
    preparingIcs = true;
    if (trigger) trigger.disabled = true;
    try {
      if (!await refreshStored()) return;
      const rows = getRows();
      if (!rows.length) { closeIcsExport(); notify(translate("出力するシフトがありません。")); return; }
      const label = typeof getLabel === 'function' ? getLabel() : getLabel;
      const filename = `shift-note-${label}.ics`;
      const contents = buildICS(rows);
      const file = new File([contents], filename, { type: 'text/calendar' });
      // A binary download URL avoids an automatic inline text preview. The
      // separate text/calendar URL remains available for opening/importing.
      let downloadUrl = null, openUrl = null;
      try {
        downloadUrl = URL.createObjectURL(new Blob([contents], { type: 'application/octet-stream' }));
        openUrl = URL.createObjectURL(file);
      } catch (error) {
        if (downloadUrl) URL.revokeObjectURL(downloadUrl);
        if (openUrl) URL.revokeObjectURL(openUrl);
        throw error;
      }
      retireIcsFile(preparedIcs);
      preparedIcs = { file, downloadUrl, openUrl, trigger, getRows, getLabel, revision: storageVersion, language, stale: false };
      $('icsFileName').textContent = filename;
      $('icsExportSummary').textContent = msg`${rows.length}件のシフトを準備しました。日本時間の予定として取り込めます。`;
      $('icsExportStatus').textContent = '';
      $('icsSave').href = downloadUrl;
      $('icsSave').download = filename;
      $('icsOpen').href = openUrl;
      $('icsSave').removeAttribute('aria-disabled');
      $('icsOpen').removeAttribute('aria-disabled');
      $('icsRefresh').hidden = true;
      $('icsShare').hidden = !canShareIcs(file);
      $('icsExportPanel').hidden = false;
      $('icsExportPanel').scrollIntoView({ behavior: 'auto', block: 'start' });
      $('icsSave').focus({ preventScroll: true });
    } catch {
      notify(translate("カレンダーファイルを準備できませんでした。もう一度お試しください。"));
    } finally {
      preparingIcs = false;
      if (trigger) trigger.disabled = false;
    }
  }

  $('icsSave').addEventListener('click', event => {
    if (!currentIcsReady()) { event.preventDefault(); return; }
    // This is a real download link: do not replace it with an async a.click().
    $('icsExportStatus').textContent = translate("保存先やダウンロード一覧をご確認ください。始まらない場合は「別画面で開く」もお試しください。");
  });
  $('icsOpen').addEventListener('click', event => {
    if (!currentIcsReady()) { event.preventDefault(); return; }
    $('icsExportStatus').textContent = translate("開いた画面の共有メニューなどから、ファイルの保存やカレンダーへの取り込みを選択してください。");
  });
  $('icsShare').addEventListener('click', async () => {
    if (!currentIcsReady()) return;
    const prepared = preparedIcs;
    if (!canShareIcs(prepared.file)) {
      $('icsShare').hidden = true;
      $('icsExportStatus').textContent = translate("この端末では共有を利用できません。「.icsを保存」をお使いください。");
      return;
    }
    sharingIcs = true;
    $('icsShare').disabled = true;
    $('icsExportClose').disabled = true;
    try {
      // Invoke before the first await so the click's activation is preserved.
      await navigator.share({ files: [prepared.file] });
      $('icsExportStatus').textContent = translate("共有画面で選んだ保存先をご確認ください。");
    } catch (error) {
      $('icsExportStatus').textContent = error.name === 'AbortError'
        ? translate("共有を終了しました。ファイルの保存は引き続き選べます。")
        : translate("共有できませんでした。「.icsを保存」または「別画面で開く」をお試しください。");
    } finally {
      sharingIcs = false;
      $('icsShare').disabled = false;
      $('icsExportClose').disabled = false;
      markIcsExportStale();
    }
  });
  $('icsExportClose').addEventListener('click', closeIcsExport);
  $('icsRefresh').addEventListener('click', () => {
    if (preparedIcs && !sharingIcs) exportICS(preparedIcs.getRows, preparedIcs.getLabel, preparedIcs.trigger);
  });
  $('icsAll').addEventListener('click', event => exportICS(() => data.shifts, 'all', event.currentTarget));
  $('historyIcs').addEventListener('click', event => exportICS(historyRows, () => $('historyMonth').value || 'all', event.currentTarget));
  $('calendarIcs').addEventListener('click', event => exportICS(calendarMonthRows, () => $('calendarMonth').value, event.currentTarget));
  // Do not revoke in pagehide: a mobile browser can be opening the calendar
  // then. On a true document unload the browser releases remaining URLs.

  function renderHeaderDate() {
    const now = new Date();
    $('headerDate').innerHTML = '<strong>' + now.toLocaleDateString(locale(), { year: 'numeric', month: 'long', day: 'numeric' }) + '</strong>' + now.toLocaleDateString('en-US', { weekday: 'long' });
  }
  function applyLanguage(next) {
    // Rebuild translated labels while preserving drafts, selection, focus and conflict baselines.
    const controls = [...document.querySelectorAll('input[id], select[id], textarea[id]')].map(el => ({
      id: el.id, value: el.value, checked: el.checked, disabled: el.disabled,
      start: el.selectionStart, end: el.selectionEnd, direction: el.selectionDirection
    }));
    const focusId = document.activeElement?.id;
    const priorMessages = new Map(messageOrigins);
    const errors = [...activeFormErrors].map(([id, state]) => [id, { ids: state.ids, errors: { ...state.errors } }]);
    const textIds = ['workHint', 'saveChoiceTitle', 'saveChoiceText', 'toastMessage', 'importFileInfo', 'importError', 'icsExportSummary', 'icsExportStatus', 'languageStatus'];
    const messages = textIds.map(id => [id, $(id).textContent]);
    const simpleErrors = [...document.querySelectorAll('.field-error, .error-banner')].map(el => [el, el.textContent]);
    const savedLimitsBaseline = limitsBaseline, savedDeductionBaseline = deductionBaseline;
    language = supportedLanguage(next);
    translateStaticUI();
    syncWorkSelect();
    renderDashboard(); renderHistory(); renderMonthCalendar(); renderWorks();
    renderLimits(); renderExtras(); renderPatternChoices();
    if (limitsDirty) limitsBaseline = savedLimitsBaseline;
    if (deductionDirty) deductionBaseline = savedDeductionBaseline;
    for (const state of controls) {
      const el = $(state.id);
      if (!el || el.type === 'file') continue;
      el.value = state.value;
      if ('checked' in el) el.checked = state.checked;
      el.disabled = state.disabled;
      if (state.start !== null && state.start !== undefined) el.setSelectionRange(state.start, state.end, state.direction);
    }
    $('languageSelect').value = language;
    renderEstimate();
    for (const [el, message] of simpleErrors) el.textContent = retranslate(message, true, priorMessages);
    for (const [id, state] of errors) displayErrors(Object.fromEntries(Object.entries(state.errors).map(([key, value]) => [key, retranslate(value, true, priorMessages)])), state.ids, id);
    for (const [id, message] of messages) $(id).textContent = retranslate(message, id === 'importError', priorMessages);
    $('pageTitle').textContent = page === 'shift' && editingShiftId ? translate('シフトを編集') : pageText()[page][0];
    $('registerShift').innerHTML = icon(editingShiftId ? 'check' : 'plus') + translate(editingShiftId ? '変更を保存' : 'このシフトを登録');
    $('workTitle').textContent = translate(editingWorkId ? '勤務先を編集' : '新しい勤務先');
    $('patternFormTitle').textContent = translate(editingPatternId ? 'パターンを編集' : 'パターンを追加');
    $('periodFormTitle').textContent = translate(editingPeriodId ? '期間を編集' : '期間を追加');
    $('returnAfterSave').textContent = msg`${(pageText()[shiftReturnPage] || pageText().history)[0]}へ戻る`;
    storageProblem = retranslate(storageProblem, true, priorMessages);
    updateStorageNotice(); renderHeaderDate();
    if (importPreview) displayImportPreview(importPreview);
    markIcsExportStale();
    if (focusId && $(focusId) && !$(focusId).closest('[hidden]')) $(focusId).focus({ preventScroll: true });
  }
  $('languageSelect').addEventListener('change', event => {
    const next = supportedLanguage(event.target.value);
    let saved = true;
    try { localStorage.setItem(LANGUAGE_KEY, next); } catch { saved = false; }
    applyLanguage(next);
    $('languageStatus').hidden = false;
    $('languageStatus').textContent = saved
      ? translate('表示言語を保存しました。')
      : translate('表示言語を切り替えましたが、保存できませんでした。再起動すると元の言語に戻る場合があります。');
  });
  window.addEventListener('storage', event => {
    if (event.key === LANGUAGE_KEY || event.key === null) {
      let next = 'ja';
      try { next = supportedLanguage(localStorage.getItem(LANGUAGE_KEY)); } catch { return; }
      if (next !== language) { applyLanguage(next); $('languageStatus').hidden = true; }
    }
  });

  $('dashboardMonth').value=today().slice(0,7); $('calendarMonth').value=today().slice(0,7);
  refreshCalendar(false);
  showPage('dashboard');
  applyLanguage(language);
  async function initialize() {
    const ready = await refreshStored(false);
    if (!shiftDirty) { syncWorkSelect(data.works.length ? data.works[0].id : ''); applyWorkSelection(); }
    if (ready) refreshViews();
  }
  initialize();
})();
