import {
    changeText
} from '@/store/utils/ioExcel'

describe('changeText', () => {

    //RC
    it('should return RC thermal', () => {
            let obj = {}
            obj.text = 'DEFAUT THERMIQUE CONVOYEUR 39070'
            expect(changeText(obj).text).to.equal('RC 39070 Thermal')
        }),
        it('should return RC mainSwitch', () => {
            let obj = {}
            obj.text = 'IM CONVOYEUR 39070'
            expect(changeText(obj).text).to.equal('RC 39070 MainSwitch')
        }),
        it('should return RC Brake', () => {
            let obj = {}
            obj.text = 'FREIN CONVOYEUR TABLE 39401/1'
            expect(changeText(obj).text).to.equal('RC 39401 Brake')
        }),
        it('should return RC Stop forward Palette', () => {
            let obj = {}
            obj.text = 'STOP PALETTE AVANT CONVOYEUR 39091/1'
            expect(changeText(obj).text).to.equal('RC 39091 Stop forwards=0')
        }),
        it('should return RC Stop backward Palette', () => {
            let obj = {}
            obj.text = 'STOP PALETTE ARRIERE CONVOYEUR 39091/1'
            expect(changeText(obj).text).to.equal('RC 39091 Stop backwards=0')
        }),
        it('should return RC Clearance forward', () => {
            let obj = {}
            obj.text = 'DEBORDEMENT PALETTE 39102'
            expect(changeText(obj).text).to.equal('RC 39102 Clearance forwards')
        }),
        it('should return RC Clearance backwards', () => {
            let obj = {}
            obj.text = 'DEBORDEMENT PALETTE ARRIERE CONVOYEUR 39190/1'
            expect(changeText(obj).text).to.equal('RC 39190 Clearance backwards')
        }),


        //Turn
        it('should return Turn thermal', () => {
            let obj = {}
            obj.text = 'DEFAUT THERMIQUE ROTATION TABLE 39080/2'
            expect(changeText(obj).text).to.equal('Turn 39080 Thermal')
        }),
        it('should return Turn mainSwitch', () => {
            let obj = {}
            obj.text = 'IM ROTATION TABLE 39071/2'
            expect(changeText(obj).text).to.equal('Turn 39071 MainSwitch')
        }),
        it('should return Turn brake', () => {
            let obj = {}
            obj.text = 'FREIN ROTATION TABLE 39401/2'
            expect(changeText(obj).text).to.equal('Turn 39401 Brake')
        }),
        it('should return Turn Detection 0°', () => {
            let obj = {}
            obj.text = 'STOP ROTATION 0° TABLE 39091/2'
            expect(changeText(obj).text).to.equal('Turn 39091 Detection 0°')
        }),
        it('should return Turn Detection slow down 0°', () => {
            let obj = {}
            obj.text = 'RALENTI ROTATION 0° TABLE 39091/2'
            expect(changeText(obj).text).to.equal('Turn 39091 Detection slow down 0°')
        }),
        it('should return Turn Detection 90°', () => {
            let obj = {}
            obj.text = 'STOP ROTATION 90° TABLE 39091/2'
            expect(changeText(obj).text).to.equal('Turn 39091 Detection 90°')
        }),
        it('should return Turn Detection slow down 90°', () => {
            let obj = {}
            obj.text = 'RALENTI ROTATION 90° TABLE 39091/2'
            expect(changeText(obj).text).to.equal('Turn 39091 Detection slow down 90°')
        }),



        //Xpup
        it('should return Estop XPUP', () => {
            let obj = {}
            obj.text = 'ARRET URGENT PUPITRE XPUP5410/32/01'
            expect(changeText(obj).text).to.equal('Xpup5410/32/01 Estop')
        }),
        it('should return Push button XPUP', () => {
            let obj = {}
            obj.text = 'BP COMMANDE MANUEL XPUP5410/32/01'
            expect(changeText(obj).text).to.equal('Xpup5410/32/01 Push button')
        }),
        it('should return Reset button XPUP', () => {
            let obj = {}
            obj.text = 'BP RESET DEFAUT XPUP5410/32/01'
            expect(changeText(obj).text).to.equal('Xpup5410/32/01 Reset')
        }),
        it('should return Reset Safety button XPUP', () => {
            let obj = {}
            obj.text = 'BP RESET SECURITE XPUP5410/32/01'
            expect(changeText(obj).text).to.equal('Xpup5410/32/01 Reset Safety')
        }),
        it('should return light reset safety ', () => {
            let obj = {}
            obj.text = 'LAMPE RESET SECURITE XPUP5410/32/01'
            expect(changeText(obj).text).to.equal('Xpup5410/32/01 Light reset safety')
        }),
        it('should return light auto ', () => {
            let obj = {}
            obj.text = 'LAMPE AUTOMATIQUE XPUP5410/32/01'
            expect(changeText(obj).text).to.equal('Xpup5410/32/01 Light auto')
        }),
        it('should return light fault ', () => {
            let obj = {}
            obj.text = 'LAMPE DEFAUT XPUP5410/32/01'
            expect(changeText(obj).text).to.equal('Xpup5410/32/01 Light fault')
        }),
        it('should return horn ', () => {
            let obj = {}
            obj.text = 'KLAXON XPUP5410/32/01'
            expect(changeText(obj).text).to.equal('Xpup5410/32/01 Horn')
        }),
        it('should return Dummy thermal ', () => {
            let obj = {}
            obj.text = 'DEFAUT THERMIQUE CONVOYEUR 39120/3'
            expect(changeText(obj).text).to.equal('Dummy 39120-3 Thermal')
        })
    it('should return Dummy thermal 2 ', () => {
        let obj = {}
        obj.text = 'DEFAUT THERMIQUE CONVOYEUR 39120/2'
        expect(changeText(obj).text).to.equal('Dummy 39120-2 Thermal')
    })
    it('should return Dummy thermal 10 ', () => {
        let obj = {}
        obj.text = 'DEFAUT THERMIQUE CONVOYEUR 39120/10'
        expect(changeText(obj).text).to.equal('Dummy 39120-10 Thermal')
    })

    it('should return Dummy MainSwitch ', () => {
        let obj = {}
        obj.text = 'I.M. CONVOYEUR 39120/3'
        expect(changeText(obj).text).to.equal('Dummy 39120-3 MainSwitch')
    })

    it('should return Lift MainSwitch ', () => {
        let obj = {}
        obj.text = 'IM Elevateur 39120/2'
        expect(changeText(obj).text).to.equal('Lift 39120 MainSwitch')
    })

    it('should return Lift Thermal ', () => {
        let obj = {}
        obj.text = 'defaut thermique Elevateur 39120/2'
        expect(changeText(obj).text).to.equal('Lift 39120 Thermal')
    })
    it('should return Lift Thermal alim ', () => {
        let obj = {}
        obj.text = 'Alim Elevateur 39120/2'
        expect(changeText(obj).text).to.equal('Lift 39120 Thermal')
    })

    it('should return Lift Brake ', () => {
        let obj = {}
        obj.text = 'Frein Elevateur 39120/2'
        expect(changeText(obj).text).to.equal('Lift 39120 Brake')
    })

    it('should return Lift limit switch down ', () => {
        let obj = {}
        obj.text = 'Securite Bas Elevateur 39120/2'
        expect(changeText(obj).text).to.equal('Lift 39120 limit switch down')
    })

    it('should return Lift limit switch up ', () => {
        let obj = {}
        obj.text = 'Securite Haut Elevateur 39120/2'
        expect(changeText(obj).text).to.equal('Lift 39120 limit switch up')
    })

    it('should return Lift Position up ', () => {
        let obj = {}
        obj.text = 'POSITION HAUT ELEVATEUR 39201/2'
        expect(changeText(obj).text).to.equal('Lift 39201 Detection up')
    })

    it('should return Lift slow down up ', () => {
        let obj = {}
        obj.text = 'RALENTI HAUT ELEVATEUR 39201/2'
        expect(changeText(obj).text).to.equal('Lift 39201 Detection slow down up')
    })

    it('should return Lift Position down ', () => {
        let obj = {}
        obj.text = 'POSITION BAS ELEVATEUR 39201/2'
        expect(changeText(obj).text).to.equal('Lift 39201 Detection down')
    })

    it('should return Lift slow down down ', () => {
        let obj = {}
        obj.text = 'RALENTI BAS ELEVATEUR 39201/2'
        expect(changeText(obj).text).to.equal('Lift 39201 Detection slow down down')
    })

    it('should return RC clock up ', () => {
        let obj = {}
        obj.text = 'STOP 1ERE PALETTE CONVOYEUR 40402'
        expect(changeText(obj).text).to.equal('RC 40402 Clock-up=0')
    })

    it('should return Hoist detection up', () => {
        let obj = {}
        obj.text = 'Position Haute Rouleau Convoyeur 02121/2'
        expect(changeText(obj).text).to.equal('Hoist 02121-2 Detection up')
    })

    it('should return Hoist detection up', () => {
        let obj = {}
        obj.text = 'Position Haute Rouleau Convoyeur 02121/1'
        expect(changeText(obj).text).to.equal('Hoist 02121-1 Detection up')
    })


    it('should return Hoist detection down', () => {
        let obj = {}
        obj.text = 'Position Basse Rouleau Convoyeur 02121/1'
        expect(changeText(obj).text).to.equal('Hoist 02121-1 Detection down')
    })

    it('should return Hoist thermal', () => {
        let obj = {}
        obj.text = 'DEFAUT THERMIQUE MONTER / DESCENDRE ROULEAU CONVOYEUR 02081/3'
        expect(changeText(obj).text).to.equal('Hoist 02081-3 Thermal')
    })
    it('should return Hoist mainswitch', () => {
        let obj = {}
        obj.text = 'IM MONTER / DESCENDRE ROULEAU CONVOYEUR 02081/3'
        expect(changeText(obj).text).to.equal('Hoist 02081-3 MainSwitch')
    })

})