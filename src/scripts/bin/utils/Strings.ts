import { Objects } from '../utils/Objects'

import { Constants } from './Constants'

export class Strings {
	public static readonly OPENING_BRACE = 'openingBrace'
	public static readonly CLOSING_BRACE = 'closingBrace'
	public static readonly STRING = 'string'
	public static readonly EQUAL_SIGN = 'equal'
	public static readonly SEPARATOR = 'separator'
	public static readonly UNKNOWN = 'unknown'

	private static schematicTypes: { [key: string]: string } = {
		EST_Milestone: 'Milestone',
		EST_MAM: 'MAM Research',
		EST_Alternate: 'Alternate recipe',
		EST_Tutorial: 'Tutorial',
		EST_HardDrive: 'HDD Research',
		EST_ResourceSink: 'AWESOME Sink',
	}

	public static webalize(name: string): string {
		return name
			.replace(/[\s|.]+/gi, '-')
			.replace(/[™:]/gi, '')
			.toLowerCase()
	}

	public static stackSizeFromEnum(size: string): number {
		switch (size) {
			case 'SS_ONE':
				return Constants.STACK_SIZE.ONE
			case 'SS_SMALL':
				return Constants.STACK_SIZE.SMALL
			case 'SS_MEDIUM':
				return Constants.STACK_SIZE.MEDIUM
			case 'SS_BIG':
				return Constants.STACK_SIZE.BIG
			case 'SS_HUGE':
				return Constants.STACK_SIZE.LARGE
			case 'SS_FLUID':
				return 50000
			default:
				throw new Error('Invalid stack size ' + size)
		}
	}

	public static unserializeDocs(text: string): any {
		const parsers: { [index: string]: RegExp } = {}
		parsers[Strings.OPENING_BRACE] = /\(/
		parsers[Strings.CLOSING_BRACE] = /\)/
		parsers[Strings.STRING] = /[a-zA-Z0-9:\\/.'"_\-]+/
		parsers[Strings.EQUAL_SIGN] = /=/
		parsers[Strings.SEPARATOR] = /,/

		try {
			const tokens = Strings.parseTokens(Strings.tokenize(text, parsers, Strings.UNKNOWN), 0).result
			return tokens
		} catch (e) {
			throw new Error('Invalid string: ' + text + '\n' + e)
		}
	}

	private static parseTokens(tokens: IToken[], currentIndex: number): { result: any; currentIndex: number } {
		let result: any = null
		let index = currentIndex
		for (; index < tokens.length; index++) {
			switch (tokens[index].type) {
				case Strings.OPENING_BRACE:
					if (result === null) {
						result = []
					} else if (Array.isArray(result) || Objects.isObject(result)) {
						const parsed = this.parseTokens(tokens, index + 1)
						if (Array.isArray(result)) {
							result.push(parsed.result)
						} else {
							result[result.length] = parsed.result
						}
						index = parsed.currentIndex - 1
					}
					break
				case Strings.CLOSING_BRACE:
					return {
						result: result,
						currentIndex: index + 1,
					}
				case Strings.STRING:
					if (tokens[index + 1] && tokens[index + 1].type === Strings.EQUAL_SIGN) {
						if (result === null) {
							result = {}
						} else if (Array.isArray(result)) {
							if (result.length) {
								throw new Error('Mixed array and object')
							}
							result = {}
						}

						const key = tokens[index].token
						if (!tokens[index + 2]) {
							throw new Error('Unexpected end of input.')
						}
						if (tokens[index + 2].type === Strings.STRING) {
							result[key] = tokens[index + 2].token
							index += 2
						} else if (tokens[index + 2].type === Strings.OPENING_BRACE) {
							const parsed = this.parseTokens(tokens, index + 2)
							result[key] = parsed.result
							index = parsed.currentIndex - 1
						} else {
							throw new Error('Expected string or (, got ' + tokens[index + 2].token)
						}
					} else {
						if (result === null) {
							result = tokens[index].token
						} else {
							if (typeof result === 'string') {
								result = [result]
							} else if (!Array.isArray(result)) {
								throw new Error('Mixed array and object')
							}
							result.push(tokens[index].token)
						}
					}

					if (!(!tokens[index + 1] || tokens[index + 1].type === Strings.SEPARATOR || tokens[index + 1].type === Strings.CLOSING_BRACE)) {
						throw new Error('Expected separator, closing brace or end of input, got ' + tokens[index + 1].token)
					}
			}
		}
		return {
			result: result,
			currentIndex: index,
		}
	}

	private static tokenize(text: string, parsers: { [index: string]: RegExp }, defaultToken?: any): IToken[] {
		let m
		let r
		let t
		const tokens = []
		while (text) {
			t = null
			m = text.length
			for (const key in parsers) {
				if (parsers.hasOwnProperty(key)) {
					r = parsers[key].exec(text)
					if (r && r.index < m) {
						t = {
							token: r[0],
							type: key,
							matches: r.slice(1),
						}
						m = r.index
					}
				}
			}
			if (m) {
				tokens.push({
					token: text.substr(0, m),
					type: defaultToken || 'unknown',
				})
			}
			if (t) {
				tokens.push(t)
			}
			text = text.substr(m + (t ? t.token.length : 0))
		}
		return tokens
	}
}

interface IToken {
	token: string
	type: string
	matches?: any
}
