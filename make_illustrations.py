"""Create editable, original SVG starter illustrations. No external photos/assets needed."""
from pathlib import Path
from html import escape
out=Path(__file__).parent/'images'
styles={
 'vietnamese':('#79513b','#d8b38c','#4a2819','#e3c3a0','#1a0e0b','#dba569'),
 'spanish':('#ddc2a4','#f6e5c9','#86553b','#f0d3af','#552e1d','#e8b373'),
 'jamun':('#6b4b65','#d9bdca','#3d1c38','#9a4b7c','#261426','#d38baa'),
 'cappuccino':('#a48466','#efdfcb','#8e5b36','#debb96','#5a3320','#f4e2ba'),
 'honey':('#ba9f7d','#efe0c0','#85583a','#dfb57e','#573521','#f4c66b'),
 'cranberry':('#92636a','#e6bec0','#4e242b','#ac4256','#29151a','#e4898b'),
 'americano':('#81766b','#ded0bd','#503122','#825235','#251813','#b88b66'),
 'lychee':('#a3a091','#e5ddd1','#66534e','#d7a1a5','#362822','#e6c1b4'),
 'coffee-default':('#af9278','#dfceb8','#6a4430','#c1a78f','#2f1f17','#ebc79a'),
}

def glass_layers(k,c):
    bg,bg2,dark,milk,espresso,accent=c
    if k=='cappuccino':
        return f'''<ellipse cx="350" cy="655" rx="208" ry="29" fill="#241407" opacity=".21"/>
<rect x="184" y="352" width="336" height="241" rx="50" fill="#fff5e7" stroke="#e5cdac" stroke-width="13"/>
<path d="M517 392 C625 355 636 550 516 538" fill="none" stroke="#f5e2ce" stroke-width="40"/>
<path d="M517 390 C595 369 607 528 515 520" fill="none" stroke="#c6a68a" stroke-width="5"/>
<ellipse cx="350" cy="364" rx="167" ry="79" fill="#5c3020" stroke="#fff1e0" stroke-width="11"/>
<ellipse cx="350" cy="366" rx="146" ry="63" fill="#92542e"/>
<path d="M348 392 C258 389 261 336 318 337 C333 306 375 311 379 336 C437 323 442 380 350 400 C392 363 374 338 349 352 C322 334 302 360 348 392Z" fill="#f6e2be"/>
<path d="M253 364 Q349 411 448 359" stroke="#ebd3aa" stroke-width="7" fill="none" stroke-linecap="round"/>
<rect x="230" y="598" width="245" height="20" rx="10" fill="#e0b991"/>'''
    if k=='jamun':
        fruit='''<circle cx="169" cy="556" r="48" fill="#362139"/><circle cx="179" cy="542" r="13" fill="#e6adca" opacity=".5"/><path d="M154 500 Q161 473 181 476" stroke="#577749" stroke-width="11" fill="none"/>'''
    else: fruit=''
    glass='''<ellipse cx="352" cy="663" rx="159" ry="21" fill="#160e0a" opacity=".24"/>
<path d="M230 290 Q220 291 227 357 L247 611 Q250 658 288 666 L418 666 Q456 658 459 613 L481 357 Q485 292 473 290Z" fill="#fff6e8" opacity=".32" stroke="#fff9ec" stroke-width="11"/>
<clipPath id="fillclip"><path d="M236 301 L469 301 L451 610 Q448 648 416 656 L290 656 Q257 644 257 610Z"/></clipPath>
<g clip-path="url(#fillclip)">'''
    if k in ('spanish','honey','vietnamese'):
        glass+=f'''<rect x="230" y="335" width="250" height="333" fill="{milk}"/>
<path d="M227 350 Q278 325 337 348 T482 344 L484 278 L223 278Z" fill="{espresso}" opacity=".92"/>
<path d="M229 357 Q291 359 332 397 T472 392 L470 436 Q389 406 347 447 Q280 472 235 402Z" fill="{dark}" opacity=".45"/>
<path d="M252 467 Q284 480 297 550 T343 651" fill="none" stroke="{espresso}" stroke-width="30" opacity=".12"/>'''
        if k=='vietnamese':glass+='''<rect x="237" y="592" width="230" height="70" fill="#fae6c2" opacity=".9"/>'''
    elif k in ('cranberry','jamun','lychee'):
        glass+=f'''<rect x="226" y="358" width="260" height="320" fill="{milk}"/>
<path d="M227 358 Q310 342 351 365 T483 347 L480 273 L222 277Z" fill="{espresso}" opacity=".97"/>
<path d="M226 409 Q330 431 481 391" stroke="#ffdbcb" stroke-width="9" fill="none" opacity=".45"/>'''
    else:
        glass+=f'''<rect x="230" y="321" width="250" height="335" fill="{espresso}"/>
<path d="M240 373 Q331 394 470 361" fill="none" stroke="{accent}" stroke-width="10" opacity=".4"/>'''
    glass+='''<g opacity=".42" stroke="#fffbf1" stroke-width="7">'''
    for x,y,r in [(275,355,-16),(397,391,17),(333,462,-22),(405,531,24),(281,550,14)]:
        glass+=f'<rect x="{x}" y="{y}" width="49" height="45" rx="7" fill="#fff7ee" transform="rotate({r} {x+25} {y+22})"/>'
    glass+='</g></g><path d="M256 337 Q248 403 270 551" fill="none" stroke="#fffdf7" stroke-width="10" stroke-linecap="round" opacity=".42"/>'
    glass+='''<ellipse cx="352" cy="295" rx="124" ry="21" fill="#eedbc8" opacity=".55" stroke="#fff4e8" stroke-width="7"/>'''
    if k in ('cranberry','lychee'):glass+='''<path d="M430 325 L507 187" stroke="#fff8e9" stroke-width="12" stroke-linecap="round" opacity=".8"/>'''
    if k=='honey':glass+='''<path d="M411 279 Q444 313 418 347" stroke="#f8d47c" stroke-width="12" fill="none" stroke-linecap="round"/>'''
    return glass+fruit

def make(k,c,w=700,h=800):
    bg,bg2,dark,milk,espresso,accent=c
    main=glass_layers(k,c)
    return f'''<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 700 800" role="img" aria-label="Stylized coffee drink illustration">
<defs><linearGradient id="bg" x2="1" y2="1"><stop stop-color="{bg2}"/><stop offset="1" stop-color="{bg}"/></linearGradient><radialGradient id="glow"><stop stop-color="#fff9ea" stop-opacity=".67"/><stop offset="1" stop-color="#fff9ea" stop-opacity="0"/></radialGradient><filter id="shade" x="-35%" y="-35%" width="170%" height="170%"><feGaussianBlur stdDeviation="30"/></filter></defs>
<rect width="700" height="800" fill="url(#bg)"/><circle cx="350" cy="270" r="337" fill="url(#glow)"/>
<circle cx="575" cy="114" r="235" fill="#fff7e5" opacity=".085"/><circle cx="105" cy="775" r="258" fill="#1f110f" opacity=".095"/>
<path d="M-30 704 C189 625 461 670 730 608 L730 810 L-30 810Z" fill="{dark}" opacity=".13"/>
<ellipse cx="360" cy="662" rx="206" ry="33" fill="#160c08" opacity=".24" filter="url(#shade)"/>
{main}
<text x="46" y="64" font-size="13" font-family="Arial,sans-serif" letter-spacing="6" fill="{dark}" opacity=".48">HOME BREW BAR</text>
<g transform="translate(614 50)"><circle r="25" fill="none" stroke="{dark}" opacity=".35"/><path d="M-12 0 H12 M0 -12 V12 M-8 -8 L8 8 M-8 8 L8 -8" stroke="{dark}" stroke-width="1.5" opacity=".7"/></g>
</svg>'''
for k,v in styles.items():
    (out/(k+'.svg')).write_text(make(k,v),encoding='utf-8')
hero=make('spanish',styles['spanish'],700,800)
(out/'hero.svg').write_text(hero,encoding='utf-8')
(out/'favicon.svg').write_text('''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="15" fill="#251910"/><path d="M12 21h32v20c0 12-28 12-28 0V21h-4zm32 4h4c14 0 9 16-4 16" fill="none" stroke="#ddbf98" stroke-width="5"/><path d="M19 51h27" stroke="#ddbf98" stroke-width="4"/></svg>''')
print('wrote',len(list(out.glob('*.svg'))),'SVG illustrations')
