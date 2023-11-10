def escape():
    s = """ROBLOX	com.roblox.client
Facebook Messenger	com.facebook.orca
Messenger Kids	com.facebook.talk
Tubi TV	com.tubitv
Duolingo: Learn Languages	com.duolingo
Evernote	com.evernote
Earn Cash & Money Rewards - CURRENT Music Screen	us.current.android
Netflix	com.netflix.mediaclient
Wish - Shopping Made Fun	com.contextlogic.wish"""
    return s.replace("\n", "\\n").replace("\t", "\\t")

if __name__ == "__main__":
    print(escape())