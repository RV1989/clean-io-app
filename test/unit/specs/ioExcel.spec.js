import {
    changeText
} from '@/store/utils/ioExcel'

describe('changeText', () => {

    //RC
    it('should return RC thermal', () => {
            let obj = {}
            obj.text = 'DEFAUT THERMIQUE CONVOYEUR 39070'
            expect(changeText(obj).text).to.equal('rc39070Thermal')
        }),
        it('should return RC mainSwitch', () => {
            let obj = {}
            obj.text = 'IM CONVOYEUR 39070'
            expect(changeText(obj).text).to.equal('rc39070MainSwitch')
        }),
        it('should return RC Brake', () => {
            let obj = {}
            obj.text = 'FREIN CONVOYEUR TABLE 39401/1'
            expect(changeText(obj).text).to.equal('rc39401Brake')
        }),
        it('should return RC Stop forward Palette', () => {
            let obj = {}
            obj.text = 'STOP PALETTE AVANT CONVOYEUR 39091/1'
            expect(changeText(obj).text).to.equal('rc39091StopForwards')
        }),
        it('should return RC Stop backward Palette', () => {
            let obj = {}
            obj.text = 'STOP PALETTE ARRIERE CONVOYEUR 39091/1'
            expect(changeText(obj).text).to.equal('rc39091StopBackwards')
        }),
        it('should return RC Clearance forward', () => {
            let obj = {}
            obj.text = 'DEBORDEMENT PALETTE 39102'
            expect(changeText(obj).text).to.equal('rc39102ClearanceForwards')
        }),
        it('should return RC Clearance backwards', () => {
            let obj = {}
            obj.text = 'DEBORDEMENT PALETTE ARRIERE CONVOYEUR 39190/1'
            expect(changeText(obj).text).to.equal('rc39190ClearanceBackwards')
        }),


        //Turn
        it('should return Turn thermal', () => {
            let obj = {}
            obj.text = 'DEFAUT THERMIQUE ROTATION TABLE 39080/2'
            expect(changeText(obj).text).to.equal('turn39080Thermal')
        }),
        it('should return Turn mainSwitch', () => {
            let obj = {}
            obj.text = 'IM ROTATION TABLE 39071/2'
            expect(changeText(obj).text).to.equal('turn39071MainSwitch')
        }),
        it('should return Turn brake', () => {
            let obj = {}
            obj.text = 'FREIN ROTATION TABLE 39401/2'
            expect(changeText(obj).text).to.equal('turn39401Brake')
        }),
        it('should return Turn Detection 0°', () => {
            let obj = {}
            obj.text = 'STOP ROTATION 0° TABLE 39091/2'
            expect(changeText(obj).text).to.equal('turn39091Detection0')
        }),
        it('should return Turn Detection slow down 0°', () => {
            let obj = {}
            obj.text = 'RALENTI ROTATION 0° TABLE 39091/2'
            expect(changeText(obj).text).to.equal('turn39091DetectionSlowDown0')
        }),
        it('should return Turn Detection 90°', () => {
            let obj = {}
            obj.text = 'STOP ROTATION 90° TABLE 39091/2'
            expect(changeText(obj).text).to.equal('turn39091Detection90')
        }),
        it('should return Turn Detection slow down 90°', () => {
            let obj = {}
            obj.text = 'RALENTI ROTATION 90° TABLE 39091/2'
            expect(changeText(obj).text).to.equal('turn39091DetectionSlowDown90')
        }),



        //Xpup
        it('should return Estop XPUP', () => {
            let obj = {}
            obj.text = 'ARRET URGENT PUPITRE XPUP5410/32/01'
            expect(changeText(obj).text).to.equal('xpup5410/32/01Estop')
        }),
        it('should return Push button XPUP', () => {
            let obj = {}
            obj.text = 'BP COMMANDE MANUEL XPUP5410/32/01'
            expect(changeText(obj).text).to.equal('xpup5410/32/01PushButton')
        }),
        it('should return Reset button XPUP', () => {
            let obj = {}
            obj.text = 'BP RESET DEFAUT XPUP5410/32/01'
            expect(changeText(obj).text).to.equal('xpup5410/32/01Reset')
        }),
        it('should return Reset Safety button XPUP', () => {
            let obj = {}
            obj.text = 'BP RESET SECURITE XPUP5410/32/01'
            expect(changeText(obj).text).to.equal('xpup5410/32/01ResetSafety')
        }),
        it('should return light reset safety ', () => {
            let obj = {}
            obj.text = 'LAMPE RESET SECURITE XPUP5410/32/01'
            expect(changeText(obj).text).to.equal('xpup5410/32/01LightResetSafety')
        }),
        it('should return light auto ', () => {
            let obj = {}
            obj.text = 'LAMPE AUTOMATIQUE XPUP5410/32/01'
            expect(changeText(obj).text).to.equal('xpup5410/32/01LightAuto')
        }),
        it('should return light fault ', () => {
            let obj = {}
            obj.text = 'LAMPE DEFAUT XPUP5410/32/01'
            expect(changeText(obj).text).to.equal('xpup5410/32/01LightFault')
        }),
        it('should return horn ', () => {
            let obj = {}
            obj.text = 'KLAXON XPUP5410/32/01'
            expect(changeText(obj).text).to.equal('xpup5410/32/01Horn')
        }),
        it('should return Dummy thermal ', () => {
            let obj = {}
            obj.text = 'DEFAUT THERMIQUE CONVOYEUR 39120/3'
            expect(changeText(obj).text).to.equal('dummy39120-3Thermal')
        })
    it('should return Dummy thermal 2 ', () => {
        let obj = {}
        obj.text = 'DEFAUT THERMIQUE CONVOYEUR 39120/2'
        expect(changeText(obj).text).to.equal('dummy39120-2Thermal')
    })
    it('should return Dummy thermal 10 ', () => {
        let obj = {}
        obj.text = 'DEFAUT THERMIQUE CONVOYEUR 39120/10'
        expect(changeText(obj).text).to.equal('dummy39120-10Thermal')
    })

    it('should return Dummy MainSwitch ', () => {
        let obj = {}
        obj.text = 'I.M. CONVOYEUR 39120/3'
        expect(changeText(obj).text).to.equal('dummy39120-3MainSwitch')
    })

    it('should return Lift MainSwitch ', () => {
        let obj = {}
        obj.text = 'IM Elevateur 39120/2'
        expect(changeText(obj).text).to.equal('lift39120MainSwitch')
    })

    it('should return Lift Thermal ', () => {
        let obj = {}
        obj.text = 'defaut thermique Elevateur 39120/2'
        expect(changeText(obj).text).to.equal('lift39120Thermal')
    })
    it('should return Lift Thermal alim ', () => {
        let obj = {}
        obj.text = 'Alim Elevateur 39120/2'
        expect(changeText(obj).text).to.equal('lift39120Thermal')
    })

    it('should return Lift Brake ', () => {
        let obj = {}
        obj.text = 'Frein Elevateur 39120/2'
        expect(changeText(obj).text).to.equal('lift39120Brake')
    })

    it('should return Lift limit switch down ', () => {
        let obj = {}
        obj.text = 'Securite Bas Elevateur 39120/2'
        expect(changeText(obj).text).to.equal('lift39120LimitSwitchDown')
    })

    it('should return Lift limit switch up ', () => {
        let obj = {}
        obj.text = 'Securite Haut Elevateur 39120/2'
        expect(changeText(obj).text).to.equal('lift39120LimitSwitchUp')
    })

    it('should return Lift Position up ', () => {
        let obj = {}
        obj.text = 'POSITION HAUT ELEVATEUR 39201/2'
        expect(changeText(obj).text).to.equal('lift39201DetectionUp')
    })

    it('should return Lift slow down up ', () => {
        let obj = {}
        obj.text = 'RALENTI HAUT ELEVATEUR 39201/2'
        expect(changeText(obj).text).to.equal('lift39201DetectionSlowDownUp')
    })

    it('should return Lift Position down ', () => {
        let obj = {}
        obj.text = 'POSITION BAS ELEVATEUR 39201/2'
        expect(changeText(obj).text).to.equal('lift39201DetectionDown')
    })

    it('should return Lift slow down down ', () => {
        let obj = {}
        obj.text = 'RALENTI BAS ELEVATEUR 39201/2'
        expect(changeText(obj).text).to.equal('lift39201DetectionSlowDownDown')
    })

    it('should return RC clock up ', () => {
        let obj = {}
        obj.text = 'STOP 1ERE PALETTE CONVOYEUR 40402'
        expect(changeText(obj).text).to.equal('rc40402ClockUp')
    })

    it('should return Hoist detection up', () => {
        let obj = {}
        obj.text = 'Position Haute Rouleau Convoyeur 02121/2'
        expect(changeText(obj).text).to.equal('hoist02121-2DetectionUp')
    })

    it('should return Hoist detection up', () => {
        let obj = {}
        obj.text = 'Position Haute Rouleau Convoyeur 02121/1'
        expect(changeText(obj).text).to.equal('hoist02121-1DetectionUp')
    })


    it('should return Hoist detection down', () => {
        let obj = {}
        obj.text = 'Position Basse Rouleau Convoyeur 02121/1'
        expect(changeText(obj).text).to.equal('hoist02121-1DetectionDown')
    })

    it('should return Hoist thermal', () => {
        let obj = {}
        obj.text = 'DEFAUT THERMIQUE MONTER / DESCENDRE ROULEAU CONVOYEUR 02081/3'
        expect(changeText(obj).text).to.equal('hoist02081-3Thermal')
    })
    it('should return Hoist mainswitch', () => {
        let obj = {}
        obj.text = 'IM MONTER / DESCENDRE ROULEAU CONVOYEUR 02081/3'
        expect(changeText(obj).text).to.equal('hoist02081-3MainSwitch')
    })

    it('should return Hoist movement up', () => {
        let obj = {}
        obj.text = 'MONTER ROULEAU CONVOYEUR 02020/2'
        expect(changeText(obj).text).to.equal('hoist02020-2MovementUp')
    })

    it('should return Hoist movement down', () => {
        let obj = {}
        obj.text = 'DESCENDRE ROULEAU CONVOYEUR 02020/2'
        expect(changeText(obj).text).to.equal('hoist02020-2MovementDown')
    })

})