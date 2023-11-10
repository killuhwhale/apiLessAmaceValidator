def escape():
    s = """com.cle.dy.soulseeker6	com.cle.dy.soulseeker6
com.pid.turnipboy	com.pid.turnipboy
com.farmadventure.global	com.farmadventure.global
com.dreamotion.ronin	com.dreamotion.ronin
com.crazylabs.lady.bug	com.crazylabs.lady.bug
com.mobile.legends	com.mobile.legends
com.dts.freefiremax	com.dts.freefiremax
com.gametaiwan.jjna	com.gametaiwan.jjna
com.ParallelSpace.Cerberus	com.ParallelSpace.Cerberus
com.os.space.force.galaxy.alien	com.os.space.force.galaxy.alien
com.devsisters.ck	com.devsisters.ck
com.bandainamcoent.saoifww	com.bandainamcoent.saoifww
com.gm_shaber.dayr	com.gm_shaber.dayr
com.gameloft.android.ANMP.GloftDOHM	com.gameloft.android.ANMP.GloftDOHM
com.gameloft.android.ANMP.GloftW2HM	com.gameloft.android.ANMP.GloftW2HM
com.tiramisu.driftmax2	com.tiramisu.driftmax2
com.ggds.ski.resort.empire.idle.tycoon.game	com.ggds.ski.resort.empire.idle.tycoon.game
com.more.lastfortress.gp	com.more.lastfortress.gp
com.game.space.shooter2	com.game.space.shooter2
com.devsisters.gb	com.devsisters.gb"""
    return s.replace("\n", "\\n").replace("\t", "\\t")

if __name__ == "__main__":
    print(escape())