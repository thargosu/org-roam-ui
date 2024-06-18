import { useRef, useState, useMemo, useCallback, useContext } from 'react'
import Fuse, { FuseResult } from 'fuse.js'
import { SearchIcon } from '@chakra-ui/icons'
import {
  Input,
  InputGroup,
  InputLeftElement,
  List,
  ModalBody,
  ModalContent,
  ModalHeader,
  Box,
} from '@chakra-ui/react'
import { Scrollbars } from 'react-custom-scrollbars-2'
import data from './searchdata.json'
import { SearchResultItem } from './SearchResultItem'
import { ThemeContext } from '../../util/themecontext'

export type SearchData = {
  id: string
  title: string
  tags: string[] | null
  content: string
}

export const SearchContent: React.FC<{
  onClickResultItem: (id: string) => void
}> = ({ onClickResultItem }) => {
  const { emacsTheme } = useContext(ThemeContext)
  type Theme = { [color: string]: string }
  const themeColors = emacsTheme[1] as Theme
  const inputValue = useRef<HTMLInputElement>(null)
  const [results, setResults] = useState<FuseResult<SearchData>[]>([])

  const fuse = useMemo(
    () =>
      new Fuse(data, {
        keys: ['tags', 'title', 'content'],
        minMatchCharLength: 2,
        includeMatches: true,
      }),
    [],
  )

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setResults(fuse.search(e.target.value))
    },
    [fuse],
  )

  return (
    <ModalContent>
      <ModalHeader>
        <InputGroup borderColor={themeColors['fg']}>
          <InputLeftElement pointerEvents="none">
            <SearchIcon />
          </InputLeftElement>
          <Input type="text" ref={inputValue} onChange={onChange} placeholder="Search node" />
        </InputGroup>
      </ModalHeader>
      {!!results.length && (
        <Scrollbars
          autoHeight={true}
          autoHide={true}
          autoHeightMax={500}
          renderThumbVertical={({ style, ...props }: { style: React.CSSProperties }) => (
            <Box
              style={{
                ...style,
                borderRadius: 0,
              }}
              {...props}
            />
          )}
        >
          <ModalBody maxHeight={500}>
            <List spacing={3}>
              {results.map((result) => (
                <SearchResultItem
                  key={result.item.id}
                  result={result}
                  onClick={onClickResultItem}
                />
              ))}
            </List>
          </ModalBody>
        </Scrollbars>
      )}
    </ModalContent>
  )
}
