import importlib.util, math
spec = importlib.util.spec_from_file_location('sketch', 'billeder/generator/sketch.py')
sk = importlib.util.module_from_spec(spec); spec.loader.exec_module(sk)
T, marker, stick, group3, bubble, box, banner, arrow, flag, skrivelinjer, canvas = (
    sk.T, sk.marker, sk.stick, sk.group3, sk.bubble, sk.box, sk.banner, sk.arrow, sk.flag, sk.skrivelinjer, sk.canvas)
INK, GUL = sk.INK, sk.GUL

def hjerte(x, y, s=1.0, fill='#fff'):
    return f'<g filter="url(#rough2)"><path d="M {x} {y+14*s} C {x-22*s} {y-6*s} {x-10*s} {y-22*s} {x} {y-8*s} C {x+10*s} {y-22*s} {x+22*s} {y-6*s} {x} {y+14*s} Z" fill="{fill}" stroke="{INK}" stroke-width="2.6"/></g>'

def lup(x, y, s=1.0):
    return (f'<g filter="url(#rough2)"><circle cx="{x}" cy="{y}" r="{16*s}" fill="#fff" stroke="{INK}" stroke-width="2.8"/>'
            f'<path d="M {x+12*s} {y+12*s} l {14*s} {14*s}" stroke="{INK}" stroke-width="3.4" stroke-linecap="round"/></g>')

def snak(x, y):
    return (bubble(x, y, 54, 34, x+16, y+50) +
            f'<g filter="url(#rough2)"><rect x="{x+40}" y="{y+18}" width="50" height="32" rx="14" fill="{GUL}" stroke="{INK}" stroke-width="2.4"/></g>')

def vaerktoj(x, y, s=1.0):
    return (f'<g filter="url(#rough2)">'
            f'<path d="M {x-14*s} {y+16*s} L {x+8*s} {y-8*s} m -4 -4 a 8 8 0 1 1 12 12 m -4 -4 L {x+26*s} {y+10*s}" stroke="{INK}" stroke-width="2.8" fill="none" stroke-linecap="round"/>'
            f'<path d="M {x-16*s} {y-10*s} l {26*s} {26*s}" stroke="{INK}" stroke-width="3.2" stroke-linecap="round"/></g>')

# ---------- CASE 2 · KVALITETSHJULET ----------
def case2(blank):
    b = []
    b.append(marker(40, 30, 400, 40))
    b.append(T(56, 60, 'KVALITETSHJULET', 34, 700))
    b.append(T(56, 92, 'SAMSKABT · ALDRIG KONTROL OPPEFRA', 17))
    b.append(T(1150, 50, 'VONSILD · 2. SAMTALE', 14, 400, 'end'))
    cx, cy, r = 600, 360, 150
    # cirkelpile (4 buer med pilehoveder)
    for a0 in (20, 110, 200, 290):
        a1 = a0 + 60
        x1, y1 = cx + r*math.cos(math.radians(a0)), cy + r*math.sin(math.radians(a0))
        x2, y2 = cx + r*math.cos(math.radians(a1)), cy + r*math.sin(math.radians(a1))
        mx, my = cx + (r+16)*math.cos(math.radians((a0+a1)/2)), cy + (r+16)*math.sin(math.radians((a0+a1)/2))
        b.append(f'<g filter="url(#rough2)"><path d="M {x1:.0f} {y1:.0f} Q {mx:.0f} {my:.0f} {x2:.0f} {y2:.0f}" stroke="{INK}" stroke-width="3" fill="none" stroke-linecap="round"/></g>')
        ang = math.atan2(y2-my, x2-mx)
        for da in (150, -150):
            hx, hy = x2 + 15*math.cos(ang+math.radians(da)), y2 + 15*math.sin(ang+math.radians(da))
            b.append(f'<path d="M {hx:.0f} {hy:.0f} L {x2:.0f} {y2:.0f}" stroke="{INK}" stroke-width="3" stroke-linecap="round" filter="url(#rough2)"/>')
    # centrum: hjerte med elev
    b.append(hjerte(cx, cy-14, 3.2, GUL))
    b.append(stick(cx, cy-26, 0.62, 'open', 51))
    b.append(T(cx, cy+52, 'ELEVERNES DELTAGELSE', 17, 700, 'middle'))
    b.append(T(cx, cy+74, 'OG PROGRESSION', 17, 700, 'middle'))
    # stationer
    st = [
        (cx-105, 118, 'middle', '1 · FÆLLES SPROG', 'KRAP OG LA2', snak(cx+52, 100), (cx-190, 130)),
        (cx+r+64, cy-60, 'start', '2 · TEGN OG DATA', 'FÅ NØGLETAL, TÆT PÅ PRAKSIS', lup(cx+r+96, cy+6), (cx+r+64, cy-36)),
        (cx-40, cy+r+58, 'middle', '3 · FÆLLES REFLEKSION', 'SUPERVISION OG VIDENDELING', group3(cx+156, cy+r+16, 0.62, 61), (cx-140, cy+r+80)),
        (cx-r-64, cy-60, 'end', '4 · HANDLING I PRAKSIS', 'SKOLENS EGNE KRÆFTER I SPIL', vaerktoj(cx-r-96, cy+10), (cx-r-260, cy-36)),
    ]
    for tx, ty, anchor, t1, t2, ikon, (lx, ly) in st:
        b.append(marker(tx-(110 if anchor=='middle' else (0 if anchor=='start' else 220)), ty-22, 225, 30))
        b.append(T(tx, ty, t1, 18, 700, anchor))
        if blank:
            b.append(skrivelinjer(lx, ly+16, 210, 2, 40))
        else:
            b.append(T(tx, ty+26, t2, 14, 400, anchor))
        b.append(ikon)
    b.append(banner(300, 614, 600, 42))
    if blank:
        b.append(skrivelinjer(340, 642, 520, 1))
    else:
        b.append(T(600, 642, 'MIN ROLLE · RAMMEN OG SYSTEMATIKKEN', 18, 700, 'middle'))
    return canvas('\n'.join(b), seed=6)

# ---------- CASE 3 · DOMÆNEMODELLEN ----------
def case3(blank):
    b = []
    b.append(marker(40, 30, 430, 40))
    b.append(T(56, 60, 'DOMÆNEMODELLEN', 34, 700))
    b.append(T(56, 92, 'NÅR URO RAMMER MIDT I OVERGANGEN', 17))
    b.append(T(1150, 50, 'VONSILD · 2. SAMTALE', 14, 400, 'end'))
    zoner = [
        (60, 'REFLEKSION', 'UNDERSØG FØRST', ['ALLE PERSPEKTIVER', 'ER LEGITIME', '1:1 MED NØGLEFOLK', 'MØD FORÆLDRENE']),
        (436, 'PRODUKTION', 'VÆR SÅ TYDELIG', ['KOMMUNIKATIONSPLAN', 'FASTE DATOER', 'KVITTERINGSPUNKTER', 'DET DER VIRKER BESTÅR']),
        (812, 'ÆSTETIK', 'ORDENTLIGHED', ['INGEN LÆSER OM EGEN', 'FREMTID MELLEM LINJER', 'LOV KUN DET JEG', 'KAN HOLDE']),
    ]
    for x, navn, sub, items in zoner:
        b.append(f'<g filter="url(#rough)"><ellipse cx="{x+164}" cy="330" rx="164" ry="190" fill="#fff" stroke="{INK}" stroke-width="2.8"/></g>')
        b.append(marker(x+52, 168, 224, 32))
        b.append(T(x+164, 192, navn, 21, 700, 'middle'))
        b.append(T(x+164, 220, sub, 14, 400, 'middle'))
        if blank:
            b.append(skrivelinjer(x+62, 262, 204, 4, 42))
        else:
            yy = 268
            for it in items:
                b.append(T(x+164, yy, it, 14.5, 400, 'middle'))
                yy += 27
    # ikoner i zonerne
    b.append(stick(150, 388, 0.8, 'open', 71))
    b.append(bubble(180, 372, 44, 32, 172, 420, 'tanke'))
    b.append(T(202, 394, '?', 20, 700, 'middle'))
    b.append(f'<g filter="url(#rough2)"><rect x="640" y="386" width="66" height="76" rx="6" fill="#fff" stroke="{INK}" stroke-width="2.6"/><path d="M 648 404 h 50 M 648 422 h 50 M 648 440 h 34" stroke="{INK}" stroke-width="2.2"/><path d="M 652 380 v 12 M 694 380 v 12" stroke="{INK}" stroke-width="2.6"/></g>')
    b.append(hjerte(976, 420, 2.2, GUL))
    # pile mellem zoner
    b.append(arrow(292, 520, 372, 520, 24))
    b.append(arrow(668, 520, 748, 520, 24))
    b.append(banner(280, 608, 640, 42))
    if blank:
        b.append(skrivelinjer(320, 636, 560, 1))
    else:
        b.append(T(600, 636, 'UNDERSØG → VÆR TYDELIG → ALTID ORDENTLIGT', 18, 700, 'middle'))
    return canvas('\n'.join(b), seed=8)

# ---------- CASE 4 · HJEMTAGELSE (broen) ----------
def case4(blank):
    b = []
    b.append(marker(40, 30, 360, 40))
    b.append(T(56, 60, 'HJEMTAGELSE', 34, 700))
    b.append(T(56, 92, 'BROEN BÆRER KUN, HVIS PILLERNE HOLDER', 17))
    b.append(T(1150, 50, 'VONSILD · 2. SAMTALE', 14, 400, 'end'))
    # bredder
    b.append(f'<g filter="url(#rough)"><path d="M 40 380 L 210 380 L 240 420 L 240 675 L 40 675 Z" fill="#fff" stroke="{INK}" stroke-width="2.8"/></g>')
    b.append(f'<g filter="url(#rough)"><path d="M 1160 340 L 990 340 L 960 396 L 960 675 L 1160 675 Z" fill="#fff" stroke="{INK}" stroke-width="2.8"/></g>')
    b.append(T(125, 348, 'EKSTERNE', 17, 700, 'middle'))
    b.append(T(125, 370, 'TILBUD', 17, 700, 'middle'))
    b.append(group3(120, 420, 0.72, 81))
    b.append(flag(1075, 330, 70))
    b.append(T(1068, 296, 'VONSILD', 19, 700, 'middle'))
    if not blank:
        b.append(T(1068, 318, 'HVOR ELEVER LYKKES', 13, 400, 'middle'))
    # vand
    for wy in (600, 630, 660):
        b.append(f'<path d="M 260 {wy} q 30 -10 60 0 t 60 0 t 60 0 t 60 0 t 60 0 t 60 0 t 60 0 t 60 0 t 60 0 t 60 0 t 60 0" stroke="{INK}" stroke-width="1.8" fill="none" opacity="0.35" filter="url(#rough2)"/>')
    # brodæk
    b.append(f'<g filter="url(#rough)"><path d="M 225 400 C 420 340 780 340 975 376" stroke="{INK}" stroke-width="4" fill="none"/><path d="M 225 424 C 420 364 780 364 975 400" stroke="{INK}" stroke-width="3" fill="none"/></g>')
    # piller
    piller = [('KAPACITET',), ('KOMPETENCER',), ('KVALITET',), ('ØKONOMI',), ('TRYGHED',)]
    for i, (navn,) in enumerate(piller):
        px = 330 + i*130
        top = 372 - 14*math.sin(math.pi*(i+1)/6)
        b.append(f'<g filter="url(#rough2)"><path d="M {px-13} 385 L {px-13} 585 M {px+13} 385 L {px+13} 585 M {px-20} 585 L {px+20} 585" stroke="{INK}" stroke-width="2.8" fill="none"/></g>')
        if blank:
            b.append(f'<g filter="url(#rough2)"><rect x="{px-56}" y="460" width="112" height="30" rx="8" fill="{GUL}" stroke="{INK}" stroke-width="2" transform="rotate(-90 {px} 505)"/></g>')
        else:
            b.append(f'<g filter="url(#rough2)"><rect x="{px-58}" y="472" width="116" height="30" rx="8" fill="{GUL}" stroke="{INK}" stroke-width="2" transform="rotate(-90 {px} 487)"/></g>')
            b.append(T(px+7, 560, navn, 14.5, 700, 'start', rot=-90))
    # gående figurer på broen
    b.append(stick(520, 320, 0.7, 'walk', 91))
    b.append(stick(575, 316, 0.62, 'walk', 92))
    # sky med målet
    b.append(f'<g filter="url(#rough)"><path d="M 330 150 q -40 4 -34 40 q -20 30 16 42 q 6 30 46 22 q 30 22 58 2 q 40 12 50 -18 q 36 -6 24 -40 q 12 -34 -28 -40 q -16 -26 -52 -14 q -40 -16 -80 6 Z" fill="#fff" stroke="{INK}" stroke-width="2.6" transform="translate(190 -12) scale(1.6 1)"/></g>')
    if blank:
        b.append(skrivelinjer(648, 172, 260, 2, 44))
    else:
        b.append(T(722, 178, 'MÅLET ER IKKE FLERE ELEVER HJEM', 19, 700, 'middle'))
        b.append(T(722, 206, 'MÅLET ER ELEVER, DER LYKKES', 19, 700, 'middle'))
    if not blank:
        b.append(T(722, 234, '· SÅ FØLGER HJEMTAGELSEN AF SIG SELV ·', 13, 400, 'middle'))
    # note
    b.append(marker(300, 610, 380, 30))
    if blank:
        b.append(skrivelinjer(316, 632, 350, 1))
    else:
        b.append(T(316, 632, 'I TÆT DIALOG MED FORVALTNINGEN', 15, 700))
        b.append(T(1150, 640, 'NYSGERRIG · IKKE SKRÅSIKKER', 14, 400, 'end'))
    return canvas('\n'.join(b), seed=9)

open('billeder/case2-kvalitetshjul-udfyldt.svg','w').write(case2(False))
open('billeder/case2-kvalitetshjul-blank.svg','w').write(case2(True))
open('billeder/case3-domaenemodel-udfyldt.svg','w').write(case3(False))
open('billeder/case3-domaenemodel-blank.svg','w').write(case3(True))
open('billeder/case4-hjemtagelse-udfyldt.svg','w').write(case4(False))
open('billeder/case4-hjemtagelse-blank.svg','w').write(case4(True))
print('OK case 2-4')
