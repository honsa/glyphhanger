var CharacterSet = require( "characterset" );

function GlyphHangerWhitelist( chars, useUsAscii ) {
	var cs = new CharacterSet();
	
	if( useUsAscii ) {
		cs = cs.union( new CharacterSet(" ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~") );
	}
	if( chars && chars.match( GlyphHangerWhitelist.unicodeCodePointsRegex ) ) {
		cs = cs.union( CharacterSet.parseUnicodeRange( chars ) );
	} else if( chars ) {
		cs = cs.union( new CharacterSet( chars ) );
	}

	this.whitelist = cs;
}

GlyphHangerWhitelist.unicodeCodePointsRegex = /(U\+[\dABCDEF]+\-?[\dABCDEF]*),?/gi;

GlyphHangerWhitelist.prototype.isEmpty = function() {
	return this.whitelist.isEmpty();
};

GlyphHangerWhitelist.prototype.getUniversalRangeAsUnicodes = function() {
	return CharacterSet.parseUnicodeRange( "U+0-10FFFF" ).toHexRangeString();
};

GlyphHangerWhitelist.prototype.getWhitelist = function() {
	return this.whitelist.toString();
};
GlyphHangerWhitelist.prototype.getWhitelistAsUnicodes = function() {
	return this.whitelist.toHexRangeString();
};

module.exports = GlyphHangerWhitelist;