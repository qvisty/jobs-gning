# -*- coding: utf-8 -*-
# Casebilleder til Dybboel-Skolen. Fire modeller, hver i udfyldt og blank udgave.
# Koeres fra repo-roden: python3 billeder/generator/dybboel.py
import importlib.util, math
spec = importlib.util.spec_from_file_location('sketch', 'billeder/generator/sketch.py')
sk = importlib.util.module_from_spec(spec); spec.loader.exec_module(sk)
T, marker, stick, group3, bubble, box, banner, arrow, flag = (
    sk.T, sk.marker, sk.stick, sk.group3, sk.bubble, sk.box, sk.banner, sk.arrow, sk.flag)
skrivelinjer, canvas, titel, badge, glimt = sk.skrivelinjer, sk.canvas, sk.titel, sk.badge, sk.glimt
INK, GUL, ORANGE = sk.INK, sk.GUL, sk.ORANGE

HJORNE = 'DYBBØL-SKOLEN · 1. SAMTALE'

def lup(x, y, s=1.0):
    return (f'<g filter="url(#rough2)"><circle cx="{x}" cy="{y}" r="{16*s}" fill="#fff" stroke="{INK}" stroke-width="2.8"/>'
            f'<path d="M {x+12*s} {y+12*s} l {14*s} {14*s}" stroke="{INK}" stroke-width="3.4" stroke-linecap="round"/></g>')

def hjerte(x, y, s=1.0, fill='#fff'):
    return (f'<g filter="url(#rough2)"><path d="M {x} {y+14*s} C {x-22*s} {y-6*s} {x-10*s} {y-22*s} {x} {y-8*s} '
            f'C {x+10*s} {y-22*s} {x+22*s} {y-6*s} {x} {y+14*s} Z" fill="{fill}" stroke="{INK}" stroke-width="2.6"/></g>')

# ---------- 1 · TRAPPEN ----------
def trappen(blank):
    b = [titel(56, 60, 'TRAPPEN', 230),
         T(56, 92, 'RO, FORSTÅ, BEVAR, UDVIKL · ÉT TRIN AD GANGEN', 17),
         T(1150, 50, HJORNE, 14, 400, 'end')]
    b.append(bubble(96, 150, 360, 86, 150, 276))
    b.append(T(120, 184, 'HVERT TRIN HVILER PÅ', 19, 700))
    b.append(T(120, 212, 'DET FORRIGE', 19, 700))
    b.append(stick(140, 318, 0.95, 'point', 11))
    trin = [
        ('RO PÅ', ['Være til stede og synlig.', 'Ingen beslutninger i uge ét.']),
        ('FORSTÅ', ['Tale med alle tre afdelinger.', 'TR og AMR tidligt og tæt.']),
        ('BEVAR', ['Holde fast i inddragelsen.', 'Sige højt, hvad der virker.']),
        ('UDVIKL', ['Justeringer ind i næste', 'skoleårs planlægning.']),
    ]
    for i, (navn, linjer) in enumerate(trin):
        x = 130 + i*260
        y = 455 - i*78
        b.append(box(x, y, 210, 132))
        if i < 3:
            b.append(arrow(x+216, y+66, x+254, y-12, 6))
        b.append(badge(x+24, y+28, i+1))
        b.append(T(x+48, y+35, navn, 21, 700))
        if blank:
            b.append(skrivelinjer(x+16, y+74, 178, 2, 44))
        else:
            for j, l in enumerate(linjer):
                b.append(T(x+16, y+64 + j*22, l, 14))
    b.append(flag(1152, 206))
    b.append(glimt(1120, 150, 0.9))
    b.append(banner(620, 582, 400))
    b.append(T(820, 611, 'EN SKOLE I RO, DER UDVIKLER SIG', 18, 700, 'middle'))
    return canvas('\n'.join(b), 4)

# ---------- 2 · SLØJFEN ----------
def sloejfen(blank):
    b = [titel(56, 60, 'SLØJFEN', 240),
         T(56, 92, 'TRIVSEL OG ARBEJDSMILJØ · LØKKEN GÅR ALTID GENNEM TR OG AMR', 17),
         T(1150, 50, HJORNE, 14, 400, 'end')]
    cx, cy = 360, 320
    for dx in (-116, 116):
        b.append(f'<g filter="url(#rough2)"><ellipse cx="{cx+dx}" cy="{cy}" rx="112" ry="84" '
                 f'fill="none" stroke="{INK}" stroke-width="3"/></g>')
    b.append(f'<g filter="url(#rough2)"><rect x="{cx-28}" y="{cy-24}" width="56" height="48" rx="13" '
             f'fill="{GUL}" stroke="{INK}" stroke-width="2.8"/></g>')
    for n, (bx, by) in enumerate([(cx-116, cy-84), (cx-116, cy+84), (cx+116, cy-84), (cx+116, cy+84)]):
        b.append(badge(bx, by, n+1, 14))
    b.append(T(cx, cy+146, 'TR OG AMR ER KNUDEN', 19, 700, 'middle'))
    b.append(T(cx, cy+170, 'Alt passerer forbi dem', 16, 400, 'middle'))
    b.append(hjerte(cx, cy-140, 1.4, ORANGE))
    b.append(glimt(cx+150, cy-128, 0.9))
    b.append(group3(190, 580, 0.62, 23))
    st = [
        ('OPDAGE', ['Hvad ser og hører vi,', 'og hvem sagde det først.']),
        ('FORSTÅ', ['Hvad ligger under.', 'Spørg, før du forklarer.']),
        ('HANDLE', ['Få og tydelige greb,', 'aftalt med dem det angår.']),
        ('FØLGE OP', ['Tilbage til dem, der', 'rejste det. Hver gang.']),
    ]
    for i, (navn, linjer) in enumerate(st):
        x, y = 690, 122 + i*126
        b.append(box(x, y, 450, 108))
        b.append(badge(x+28, y+32, i+1))
        b.append(T(x+56, y+39, navn, 21, 700))
        if blank:
            b.append(skrivelinjer(x+20, y+72, 410, 1, 36))
        else:
            for j, l in enumerate(linjer):
                b.append(T(x+20, y+68 + j*22, l, 15))
    b.append(arrow(686, 612, 440, 520, 54))
    b.append(T(545, 552, 'OG SÅ FORFRA', 16, 700, 'middle'))
    return canvas('\n'.join(b), 6)

# ---------- 3 · VÆGTEN ----------
def vaegten(blank):
    b = [titel(56, 60, 'VÆGTEN', 230),
         T(56, 92, 'FAGLIG KVALITET OG ØKONOMI VÆGTER LIGE HØJT · LEDELSESGRUNDLAGET', 17),
         T(1150, 50, HJORNE, 14, 400, 'end')]
    b.append(banner(336, 136, 528))
    b.append(T(600, 166, 'DE ER IKKE MODSÆTNINGER', 20, 700, 'middle'))
    bx, by = 600, 272
    b.append(f'<g filter="url(#rough2)"><path d="M {bx-280} {by} L {bx+280} {by}" stroke="{INK}" '
             f'stroke-width="4" stroke-linecap="round"/>'
             f'<path d="M {bx} {by} L {bx-44} {by+142} L {bx+44} {by+142} Z" fill="#fff" '
             f'stroke="{INK}" stroke-width="2.8"/>'
             f'<circle cx="{bx}" cy="{by}" r="9" fill="{ORANGE}" stroke="{INK}" stroke-width="2.4"/></g>')
    for sx in (bx-280, bx+280):
        b.append(f'<g filter="url(#rough2)"><path d="M {sx} {by} L {sx} {by+42}" stroke="{INK}" stroke-width="2.4"/>'
                 f'<path d="M {sx-62} {by+42} Q {sx} {by+76} {sx+62} {by+42}" fill="#fff" stroke="{INK}" stroke-width="2.8"/></g>')
    par = [
        (150, 'FAGLIG KVALITET', ['Undervisningens kvalitet', 'Trivsel og deltagelse', 'Mellemformer der holder']),
        (720, 'ØKONOMI', ['Rammen meldt tidligt', 'Prioritering med personalet', 'Holdbar drift næste år']),
    ]
    for x, navn, linjer in par:
        b.append(box(x, 372, 330, 238))
        b.append(T(x+24, 412, navn, 21, 700))
        if blank:
            b.append(skrivelinjer(x+22, 452, 286, 3, 46))
        else:
            for j, l in enumerate(linjer):
                b.append(T(x+24, 456 + j*36, l, 16))
    b.append(stick(600, 474, 0.72, 'open', 19))
    b.append(T(600, 596, 'LEDEREN HOLDER', 17, 700, 'middle'))
    b.append(T(600, 620, 'BEGGE ENDER', 17, 700, 'middle'))
    b.append(glimt(452, 230, 0.9))
    b.append(glimt(760, 238, 0.8))
    return canvas('\n'.join(b), 8)

# ---------- 4 · MELLEMFORMS-SPEKTRET ----------
def mellemformer(blank):
    b = [titel(56, 60, 'MELLEMFORMER', 390),
         T(56, 92, 'SEGREGERINGEN STIGER · HOLDET ER ALLEREDE I HUSET', 17),
         T(1150, 50, HJORNE, 14, 400, 'end')]
    b.append(arrow(150, 186, 1050, 186, -24))
    b.append(T(600, 152, 'UDVIKLINGEN NU', 17, 700, 'middle'))
    zoner = [
        (60, 'ALMENKLASSEN', ['Her hører eleven til.', 'Her skal der mere til.'], False),
        (430, 'MELLEMFORMEN', ['Mere end færre elever.', 'Voksne, struktur, sprog.'], True),
        (800, 'SPECIALSKOLEN', ['Den rigtige vej for nogle,', 'ikke for flere.'], False),
    ]
    for x, navn, linjer, frem in zoner:
        if frem:
            b.append(marker(x+14, 230, 312, 34))
        b.append(box(x, 272, 340, 176))
        b.append(T(x+22, 258, navn, 21, 700))
        if blank:
            b.append(skrivelinjer(x+22, 322, 296, 2, 46))
        else:
            for j, l in enumerate(linjer):
                b.append(T(x+22, 318 + j*30, l, 16))
    b.append(box(60, 486, 860, 162))
    b.append(T(88, 526, 'DET, DER GØR MELLEMFORMER MULIGE', 21, 700))
    res = ['Sløjfen, som allerede arbejder med opgaven',
           'Vejlederne tilknyttet skolebiblioteket',
           'Et fælles sprog om, hvad eleven har brug for']
    if blank:
        b.append(skrivelinjer(88, 570, 804, 2, 44))
    else:
        for j, r in enumerate(res):
            b.append(badge(106, 566 + j*30, j+1, 12))
            b.append(T(132, 572 + j*30, r, 16))
    b.append(group3(1046, 560, 0.66, 31))
    b.append(glimt(600, 212, 0.9))
    return canvas('\n'.join(b), 10)

if __name__ == '__main__':
    ark = [('dyb1-trappen', trappen), ('dyb2-sloejfen', sloejfen),
           ('dyb3-vaegten', vaegten), ('dyb4-mellemformer', mellemformer)]
    for navn, fn in ark:
        for suffix, blank in (('udfyldt', False), ('blank', True)):
            sti = f'billeder/{navn}-{suffix}.svg'
            open(sti, 'w', encoding='utf-8').write(fn(blank))
            print('skrev', sti)
